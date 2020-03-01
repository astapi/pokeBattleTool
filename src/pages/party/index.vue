<template>
  <div>
    <section class="p-10 mt-10">
      <nuxt-link to="/party/edit" class="able-button">
        チーム登録
      </nuxt-link>
    </section>
    <section class="p-10">
      <div v-if="partyList.length === 0">まだチームがいません。登録してみましょう。</div>
      <ul class="flex justify-start flex-wrap">
        <li v-for="(party, index) of partyList" :key="index" class="mr-10 mb-10">
          <div>
            チーム{{ index + 1 }}
            <span @click="deleteTeam(party.id)"><i class="fas fa-trash ml-3"></i></span>
          </div>
          <div style="height: 500px;" class="flex flex-col justify-between">
            <template v-for="pokemon of party.team">
              <PokemonImageAndName
                :key="pokemon.name"
                :image-url="pokemon.imageUrl"
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
import { PokemonData, PartyPokemon, PokemonFromDB, PartyFromDB } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { pokemonDataFromNameOrManagemendId } from '@/utils/common'

const pokeData = require('@/data/pokeData.json')

type Team = { team: PokemonData[], id: string };

@Component({
   components: {
     PokemonImageAndName
   }
})
export default class ListParty extends Vue {
  partyList: Team[] = [];

  async created() {
    this.$store.commit('setIsLoading', true)
    await this.fetchData();
    this.$store.commit('setIsLoading', false)
  }

  async fetchData() {
    const snap = await firebase.firestore()
      .collection('party')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .orderBy('createdAt', 'asc')
      .get()
    if (snap.size === 0) return;
    for (const doc of snap.docs) {
      const data = doc.data() as PartyFromDB
      const party: PokemonData[] = [];
      for (const pokemon of data.party) {
        const pokemonData = await pokemonDataFromNameOrManagemendId( { name: pokemon.name, managementId: pokemon.managementId });
        party.push(pokemonData);
      }
      this.partyList.push({ team: party, id: doc.id })
    }
  }

  setPartyMoveBattle(team: Team): void {
    this.$store.commit('battle/setMyPokemonList', team.team)
    this.$router.push({ path: '/battle/selectBattleType' })
  }

  async deleteTeam(id: string): Promise<void> {
    this.partyList = [];
    this.$store.commit('setIsLoading', true)
    await firebase.firestore()
      .collection('party')
      .doc(id)
      .delete()
    await this.fetchData()
    this.$store.commit('setIsLoading', false)
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
