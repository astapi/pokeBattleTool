<template>
  <div class="lg:flex relative p-5">
    <section class="party mt-12 lg:mt-0 lg:flex mx-auto w-full">
      <section class="lg:flex lg:w-2/5">
        <div class="my-party flex lg:flex-col lg:mr-10 lg:w-2/6">
          <template v-for="pokemon of myParty">
            <PokemonImageAndName
              :key="pokemon.name"
              :image-url="pokemon.imageUrl"
              :name="pokemon.name"
            />
          </template>
        </div>
        <section class="my-select lg:w-4/6">
          <section class="bg-white shadow rounded p-5 flex justify-center">
            <div class="flex flex-col">
              <template v-for="pokemon of selectFromMyParty">
                <Pokemon :key="pokemon.name" :pokemon="pokemon" />
              </template>
            </div>
          </section>
        </section>
      </section>

      <div class="flex justify-around mt-5 lg:mt-0 lg:hidden">
        <button @click="saveBattle('win')" class="able-button">勝ち</button>
        <button @click="saveBattle('lose')" class="able-button">負け</button>
      </div>

      <div class="hidden lg:block" style="width: 16%;">
        <div class="flex justify-around">
          <button @click="saveBattle('win')" class="able-button">勝ち</button>
          <button @click="saveBattle('lose')" class="able-button">負け</button>
        </div>
        <div
          v-if="battolePokemonSpeedList.length > 0"
          class="flex flex-col-reverse items-center mt-2"
        >
          <template
            v-for="(baseStatsSpeedPokemonList,
            index) of battolePokemonSpeedList"
          >
            <div :key="index">
              <div class="flex">
                <div class="text-sm">
                  {{ baseStatsSpeedPokemonList[0].baseStatsSpeed }}族
                </div>
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
                <br />
                <span class="text-xs">
                  <span class="font-bold">{{
                    Math.floor(baseStatsSpeedPokemonList[0].baseSpeed * 1.1)
                  }}</span
                  >/{{ baseStatsSpeedPokemonList[0].baseSpeed }}/{{
                    Math.floor(baseStatsSpeedPokemonList[0].baseSpeed * 0.9)
                  }}</span
                >
              </div>
            </div>
          </template>
        </div>
      </div>

      <section class="mt-5 lg:mt-0 lg:flex lg:w-2/5">
        <section class="enemy-select lg:w-4/6">
          <section class="bg-white shadow rounded p-5 flex justify-center">
            <div class="flex flex-col">
              <template v-for="pokemon of selectFromEnemyParty">
                <Pokemon :key="pokemon.name" :pokemon="pokemon" />
              </template>
            </div>
          </section>
        </section>
        <div class="enemy-party flex lg:flex-col lg:w-2/6 lg:ml-10">
          <div
            v-for="pokemon of enemyParty"
            :key="pokemon.name"
            @click="selectEnemy(pokemon)"
            class="flex flex-wrap"
          >
            <PokemonImageAndName
              :image-url="pokemon.imageUrl"
              :name="pokemon.name"
              :class="selectFromEnemyParty.find((p) => p.name === pokemon.name)"
            />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import { changePokemonNameToOtherLang } from '@/utils/common'
import { PokemonData, SpeedData, PokemonFromDB } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'
import Pokemon from '@/components/pokemon/pokemon.vue'
import 'firebase/firestore'

@Component({
  components: {
    PokemonImageAndName,
    Pokemon
  }
})
export default class BattleIndex extends Vue {
  selectFromEnemyParty: PokemonData[] = []

  get myParty(): PokemonData[] {
    return this.$store.state.battle.myPokemonList
  }

  get enemyParty(): PokemonData[] {
    return this.$store.state.battle.enemyPokemonList
  }

  get selectFromMyParty(): PokemonData[] {
    return this.$store.state.battle.selectedBattlePokemonFromTeam
  }

  get allBattlePokemon(): PokemonData[] {
    return [...this.myParty, ...this.enemyParty]
  }

  get battolePokemonSpeedList(): SpeedData[][] {
    // const ret: SpeedData[] = []
    const a: any = {}
    for (const pokemon of this.allBattlePokemon) {
      const baseStatsSpeed = pokemon.calcPokemon.species.bs.sp
      if (a[baseStatsSpeed]) {
        const index = a[baseStatsSpeed].findIndex(
          (p: PokemonData) => p.name === pokemon.name
        )
        if (index === -1)
          a[baseStatsSpeed].push({
            name: pokemon.name,
            imageUrl: pokemon.imageUrl,
            baseSpeed: pokemon.calcPokemon.rawStats.spe
          })
      } else {
        a[baseStatsSpeed] = [
          {
            name: pokemon.name,
            imageUrl: pokemon.imageUrl,
            baseSpeed: pokemon.calcPokemon.rawStats.spe
          }
        ]
      }
    }
    const ret: SpeedData[][] = []
    for (const baseStatsSpeed of Object.keys(a)) {
      ret.push(
        a[baseStatsSpeed].map((speedData: any) => {
          return { ...speedData, baseStatsSpeed }
        })
      )
    }
    return ret
  }

  selectEnemy(pokemon: PokemonData) {
    if (process.client) {
      const index = this.selectFromEnemyParty.findIndex(
        (p: PokemonData) => p.name === pokemon.name
      )
      if (index > -1) {
        this.selectFromEnemyParty.splice(index, 1)
      } else {
        this.selectFromEnemyParty.push(pokemon)
      }
    }
  }

  saveBattle(type: string) {
    firebase
      .firestore()
      .collection('battleLog')
      .add({
        myParty: this.myParty.map((p) => this.pokemonDataFromPokemonFromDB(p)),
        enemyParty: this.enemyParty.map((p) =>
          this.pokemonDataFromPokemonFromDB(p)
        ),
        selectFromMyParty: this.selectFromMyParty.map((p) =>
          this.pokemonDataFromPokemonFromDB(p)
        ),
        selectFromEnemyParty: this.selectFromEnemyParty.map((p) =>
          this.pokemonDataFromPokemonFromDB(p)
        ),
        result: type,
        battleType: this.$store.state.battle.battleType,
        userUid: this.$store.state.loginUser.userUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    this.$router.push('/battle/entry')
  }

  pokemonDataFromPokemonFromDB(pokemon: PokemonData): PokemonFromDB {
    const ret: PokemonFromDB = {
      name: changePokemonNameToOtherLang(pokemon.name),
      isManagement: false
    }
    if (pokemon.isManagement) {
      ret.isManagement = true
      ret.managementId = pokemon.managementId
    }
    return ret
  }
}
</script>

<style lang="scss" scoped>
.container {
  .selected {
    @apply bg-yellow-200;
  }
}
</style>
