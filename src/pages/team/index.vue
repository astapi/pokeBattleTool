<template>
  <div class="container mx-auto relative">
    <section class="absolute" style="top: 15px; right: 15px">
      <nuxt-link to="/team/edit" class="able-button">
        チーム登録
      </nuxt-link>
    </section>
    <section class="mt-16">
      <div v-if="partyList.length === 0">
        まだチームがいません。登録してみましょう。
      </div>
      <ul class="flex justify-start flex-wrap">
        <li
          v-for="(party, index) of partyList"
          :key="index"
          class="mr-10 mb-10"
        >
          <div>
            チーム{{ index + 1 }}
            <span @click="deleteTeam(party.id)"
              ><i class="fas fa-trash ml-3"></i
            ></span>
          </div>
          <div class="flex flex-col">
            <template v-for="pokemon of party.team">
              <PokemonImage
                :key="pokemon.name"
                :pokemon-image-url="pokemon.imageUrl"
              />
            </template>
          </div>
          <button class="able-button mt-3" @click="setPartyMoveBattle(party)">
            使用する
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import { PokemonData, PartyFromDB } from '@/interface/pokemon'
import PokemonImage from '@/components/pokemon/pokemonImage.vue'
import 'firebase/firestore'
import { pokemonDataFromNameOrManagemendId } from '@/utils/common'

type Team = { team: PokemonData[]; id: string }

@Component({
  components: {
    PokemonImage
  }
})
export default class ListParty extends Vue {
  partyList: Team[] = []

  async created() {
    this.$store.commit('setIsLoading', true)
    await this.fetchData()
    this.$store.commit('setIsLoading', false)
  }

  async fetchData() {
    const snap = await firebase
      .firestore()
      .collection('party')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .orderBy('createdAt', 'asc')
      .get()
    if (snap.size === 0) return
    for (const doc of snap.docs) {
      const data = doc.data() as PartyFromDB
      const party: PokemonData[] = []
      for (const pokemon of data.party) {
        const pokemonData = await pokemonDataFromNameOrManagemendId({
          name: pokemon.name,
          managementId: pokemon.managementId
        })
        party.push(pokemonData)
      }
      this.partyList.push({ team: party, id: doc.id })
    }
  }

  setPartyMoveBattle(team: Team): void {
    this.$store.commit('battle/setMyPokemonList', team.team)
    this.$router.push({ path: '/battle/selectBattleType' })
  }

  async deleteTeam(id: string): Promise<void> {
    this.partyList = []
    this.$store.commit('setIsLoading', true)
    await firebase
      .firestore()
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
  max-width: 756px;
}
</style>
