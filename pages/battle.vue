<template>
  <div class="flex relative p-5">
    <section class="party flex mx-auto w-full">
      <section class="flex" style="width: 42%;">
        <div class="my-party flex flex-col mr-5">
          <template v-for="pokemon of myParty">
            <PokemonImageAndName
              :key="pokemon.name"
              :image-url="storageUrl(pokemon.gifUrl)"
              :name="pokemon.name"
            />
          </template>
        </div>
        <div class="my-select flex justify-center" style="width: 80%;">
          <div class="flex flex-col">
            <template v-for="pokemon of selectFromMyParty">
              <Pokemon
                :key="pokemon.name"
                :pokemon="pokemon"
                style="width: 260px"
              />
            </template>
          </div>
        </div>
      </section>
      <div class="flex justify-center" style="width: 16%;">
        <ul>
          <li
            v-for="speedData of battolePokemonSpeedList"
            :key="speedData.name + speedData.correction"
            class="flex"
          >
            <div><img :src="speedData.icon" class="w-8" /></div>
            <div>{{ speedData.status }}</div>
            <div class="text-xs">{{ '(' + speedData.correction + ')' }}</div>
          </li>
        </ul>
      </div>
      <section class="flex" style="width: 42%;">
        <div class="enemy-select flex justify-center" style="width: 80%;">
          <div class="flex flex-col">
            <template v-for="pokemon of selectFromEnemyParty">
              <Pokemon
                :key="pokemon.name"
                :pokemon="pokemon"
                style="width: 260px;"
              />
            </template>
          </div>
        </div>
        <div class="enemy-party flex flex-col">
          <div
            v-for="pokemon of enemyParty"
            :key="pokemon.name"
            @click="selectEnemy(pokemon)"
            class="flex flex-wrap"
          >
            <PokemonImageAndName
              :image-url="storageUrl(pokemon.gifUrl)"
              :name="pokemon.name"
              :id="`pokemon-${pokemon.gararuNo}`"
            />
          </div>
        </div>
      </section>
    </section>
    <div>
      <button @click="saveBattle('win')">勝ち</button>
      <button @click="saveBattle('lose')">負け</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import { PokemonData } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'
import Pokemon from '@/components/pokemon/pokemon.vue'

import 'firebase/firestore'

interface SpeedData {
  icon: string
  name: string
  status: number
  correction: string
}

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    PokemonImageAndName,
    Pokemon
  }
})
export default class Index extends Vue {
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

  selectEnemy(pokemon: PokemonData) {
    if (process.client) {
      const dom = document.querySelector(`#pokemon-${pokemon.gararuNo}`)
      if (!dom) return
      const ret = dom.classList.toggle('selected')
      if (ret) {
        this.selectFromEnemyParty.push(pokemon)
      } else {
        const index = this.selectFromEnemyParty.findIndex(
          (p: PokemonData) => p.name === pokemon.name
        )
        this.selectFromEnemyParty.splice(index, 1)
      }
    }
  }

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
  }

  saveBattle(type: string) {
    firebase
      .firestore()
      .collection('battleLog')
      .add({
        myParty: this.myParty.map((p) => p.zenkokuNo),
        enemyParty: this.enemyParty.map((p) => p.zenkokuNo),
        selectFromMyParty: this.selectFromMyParty.map((p) => p.zenkokuNo),
        selectFromEnemyParty: this.selectFromEnemyParty.map((p) => p.zenkokuNo),
        result: type,
        userUid: this.$store.state.loginUser.userUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
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
