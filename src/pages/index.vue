<template>
  <div class="container relative p-5">
    <SideMenu></SideMenu>

    <section class="party flex justify-around w-full">
      <section class="my-party" style="width: 45%;">
        <div class="bg-white shadow rounded flex flex-col justify-center mt-24">
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
        class="flex justify-center"
        style="width: 10%;"
      >
        <ul>
          <li
            v-for="speedData of battolePokemonSpeedList"
            :key="speedData.name + speedData.correction"
            class="flex"
          >
            <div><img :src="speedData.icon" class="w-6" /></div>
            <div>{{ speedData.status }}</div>
            <div class="text-xs">{{ '(' + speedData.correction + ')' }}</div>
          </li>
        </ul>
      </div>

      <section class="enemy-party" style="width: 45%;">
        <div class="bg-white shadow flex flex-col justify-center mt-24">
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
import { PokemonData, SpeedData } from '@/interface/pokemon'
import SideMenu from '@/components/layouts/SideMenu.vue'
import MyParty from '@/components/myParty.vue'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    MyParty,
    SideMenu,
  }
})
export default class Index extends Vue {
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

  get battolePokemonSpeedList(): SpeedData[] {
    const ret: SpeedData[] = []
    const baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
    for (const pokemon of this.allBattlePokemon) {
      for (const correction of Object.keys(pokemon.status)) {
        const status = pokemon.status[correction]
        if (correction === '最低' || correction === '下降') continue
        ret.push({
          icon: `${baseUrl}${pokemon.gifUrl.split('icon96/')[1]}`,
          name: pokemon.name,
          status: status.Speed ? status.Speed : 0,
          correction
        })
        // スカーフ
        // ret.push({
        //   icon: `${baseUrl}${pokemon.gifUrl.split('icon96/')[1]}`,
        //   name: pokemon.name,
        //   status: status.Speed ? status.Speed * 2 : 0,
        //   correction: correction + 'スカーフ'
        // });
      }
    }
    ret.sort((a, b) => b.status - a.status)
    return ret
  }

  get battleStartButtonClass() {
    if (this.battleReady) {
      return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 border border-blue-700 rounded'
    }
    return 'bg-blue-500 text-white font-bold py-2 px-1 rounded opacity-50 cursor-not-allowed'
  }

  get battleReady(): boolean {
    if (this.enemyParty.length === 6 && this.mySelectPokemon.length === 3)
      return true
    return false
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
