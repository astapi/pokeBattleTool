<template>
  <div class="container relative p-5">
    <section class="party flex justify-around w-full">
      <section class="my-party" style="width: 45%;">
        <div class="bg-white shadow rounded flex flex-col justify-center mt-10">
          <MyParty
            v-if="myParty.length > 0"
            :party-data="myParty"
            @select="selectFromMyParty"
          />
          <div class="flex justify-center mt-5 mb-5">
            <nuxt-link to="/party" class="mx-auto able-button">
              チーム選択へ
            </nuxt-link>
          </div>
        </div>
      </section>

      <div
        v-if="myParty.length > 0 && enemyParty.length > 0"
        class="flex flex-col-reverse justify-center"
        style="width: 15%;"
      >
        <template v-for="(baseStatsSpeedPokemonList, index) of battolePokemonSpeedList">
          <div :key="index">
            <div class="flex">
              <div class="text-sm">{{ baseStatsSpeedPokemonList[0].baseStatsSpeed }}族</div>  
              <div
                v-for="speedData of baseStatsSpeedPokemonList"
                :key="speedData.name"
                class="flex"
              >
                <div><img :src="speedData.imageUrl" class="w-6" /></div>
              </div>
            </div>
            <div>
              <span class="text-xs">上方/無振/下降</span>
              <span class="text-xs">
                <span class="font-bold">{{ Math.floor(baseStatsSpeedPokemonList[0].baseSpeed * 1.1) }}</span>/{{ baseStatsSpeedPokemonList[0].baseSpeed }}/{{ Math.floor(baseStatsSpeedPokemonList[0].baseSpeed * 0.9) }}</span>
            </div>
          </div>
        </template>
      </div>

      <section class="enemy-party" style="width: 45%;">
        <div class="bg-white shadow flex flex-col justify-center mt-10">
          <MyParty v-if="enemyParty.length > 0" :party-data="enemyParty" />
          <div class="flex justify-center mt-5 mb-5">
            <nuxt-link to="selectEnemy" class="mx-auto able-button">
              相手ポケモン選択へ
            </nuxt-link>
          </div>
        </div>
      </section>
    </section>
    <div class="mt-10 flex justify-center">
      <button
        v-if="battleReady"
        @click="startBattle"
        class="mx-auto able-button"
      >
        battle start
      </button>
      <button v-else class="mx-auto disable-button">
        battle start
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData, SpeedData, PokemonFromDB } from '@/interface/pokemon'
import MyParty from '@/components/myParty.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { BattleType } from '@/interface/battoleLog'

@Component({
  components: {
    MyParty,
  }
})
export default class BattleEntry extends Vue {
  mySelectPokemon: PokemonData[] = []

  get myParty(): PokemonData[] {
    return this.$store.state.battle.myPokemonList
  }

  get enemyParty(): PokemonData[] {
    return this.$store.state.battle.enemyPokemonList
  }

  get allBattlePokemon(): PokemonData[] {
    return [...this.myParty, ...this.enemyParty]
  }

  get battolePokemonSpeedList(): SpeedData[][] {
    // const ret: SpeedData[] = []
    const a: any = {};
    for (const pokemon of this.allBattlePokemon) {
      const baseStatsSpeed = pokemon.calcPokemon.species.bs.sp;
      if (a[baseStatsSpeed]) {
        const index = a[baseStatsSpeed].findIndex((p: PokemonData) => p.name === pokemon.name);
        if (index === -1) a[baseStatsSpeed].push({ name: pokemon.name, imageUrl: pokemon.imageUrl, baseSpeed: pokemon.calcPokemon.rawStats.spe });
      } else {
        a[baseStatsSpeed] = [{ name: pokemon.name, imageUrl: pokemon.imageUrl, baseSpeed: pokemon.calcPokemon.rawStats.spe }];
      }
    }
    const ret: SpeedData[][] = [];
    for (const baseStatsSpeed of Object.keys(a)) {
      ret.push(a[baseStatsSpeed].map((speedData: any) => {
        return { ...speedData, baseStatsSpeed };
      }));
    }
    return ret
  }

  get battleStartButtonClass() {
    if (this.battleReady) {
      return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 border border-blue-700 rounded'
    }
    return 'bg-blue-500 text-white font-bold py-2 px-1 rounded opacity-50 cursor-not-allowed'
  }

  get battleReady(): boolean {
    // single, double で条件を変える
    if (this.battleType === 'single') {
      if (this.enemyParty.length === 6 && this.mySelectPokemon.length === 3)
        return true
      return false
    }
    // double
    if (this.enemyParty.length === 6 && this.mySelectPokemon.length === 4)
      return true
    return false
  }

  get battleType(): BattleType {
    return this.$store.state.battle.battleType
  }

  selectEnemy(pokemon: PokemonData) {
    const index = this.enemyParty.findIndex((p) => pokemon.name === p.name)
    if (index === -1) {
      this.enemyParty.push(pokemon)
      return
    }
    this.enemyParty.splice(index, 1)
  }

  selectFromMyParty(pokemon: PokemonData) {
    const index = this.mySelectPokemon.findIndex((p) => pokemon.name === p.name)
    if (index === -1) {
      this.mySelectPokemon.push(pokemon)
      return
    }
    this.mySelectPokemon.splice(index, 1)
  }

  startBattle() {
    this.$store.commit(
      'battle/setSelectedBattlePokemonFromTeam',
      this.mySelectPokemon
    )
    this.$router.push({ path: '/battle' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  .my-party {
  }
}
</style>
