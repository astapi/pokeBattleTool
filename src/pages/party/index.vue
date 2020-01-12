<template>
  <div>
    <section class="p-10">
      <nuxt-link to="/party/edit" class="able-button">
        パーティ登録
      </nuxt-link>
    </section>
    <section class="p-10">
      <div v-if="partyList.length === 0">まだパーティがいません。登録してみましょう。</div>
      <ul class="flex justify-start">
        <li v-for="(party, index) of partyList" :key="index" class="mr-10">
          <div>パーティ{{ index + 1 }}</div>
          <div style="height: 500px;" class="flex flex-col justify-between">
            <template v-for="pokemon of party">
              <PokemonImageAndName
                :key="pokemon.name"
                :image-url="storageUrl(pokemon.gifUrl)"
                :name="pokemon.name"
              />
            </template>
          </div>
          <button @click="setPartyMoveBattle(party)" class="able-button mt-3">使用する</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const pokeData = require('@/data/pokeData.json')

@Component({
   components: {
     PokemonImageAndName
   }
})
export default class ListParty extends Vue {
  partyList: PokemonData[][] = [];

  created() {
    this.$store.commit('setIsLoading', true)
    firebase.firestore()
      .collection('party')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .orderBy('createdAt', 'asc')
      .get()
      .then((snap) => {
        if (snap.size === 0) return;
        for (const doc of snap.docs) {
          const data = doc.data()
          const party = data.party.map((no: string) => {
            return pokeData.data.find((p: PokemonData) => p.zenkokuNo === no)
          })
          this.partyList.push(party)
        }
        this.$store.commit('setIsLoading', false)
      })
  }

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
  }

  setPartyMoveBattle(party: PokemonData[]): void {
    this.$store.commit('battle/setMyPokemonList', party)
    this.$router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
