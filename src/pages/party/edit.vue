<template>
  <div class="container mt-20">
    <div class="mb-10 flex justify-center">
      <button class="able-button" @click="endSelect">チーム設定完了！</button>
    </div>
    <div class="search-list w-full mt-3 border-solid lg:px-40">
      <!-- <SearchFromPokemonManagementList
        @select="selectPokemonFromManagement"
      ></SearchFromPokemonManagementList> -->
      <SearchFromPokemonList
        :pokemon-list="pokemonDataList"
        @select="selectPokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import { PokemonData } from '@/interface/pokemon'
import SearchFromPokemonList from '@/components/searchFromPokemonList.vue'
import SearchFromPokemonManagementList from '@/components/searchFromPokemonManagementList.vue'
import 'firebase/firestore'
import { changePokemonNameToOtherLang } from '@/utils/common'

@Component({
  components: {
    SearchFromPokemonManagementList,
    SearchFromPokemonList
  }
})
export default class EditParty extends Vue {
  party: any[] = []

  get pokemonDataList() {
    return this.$store.state.battle.battlePokemonDataList
  }

  selectPokemonFromManagement(pokemon: PokemonData & { managementId: string }) {
    const nameEn = changePokemonNameToOtherLang(pokemon.name)
    const index = this.party.findIndex((p) => nameEn === p.name)
    if (index === -1) {
      this.party.push({
        name: nameEn,
        isManagement: true,
        managementId: pokemon.managementId
      })
      return
    }
    this.party.splice(index, 1)
  }

  selectPokemon(pokemon: PokemonData) {
    const nameEn = changePokemonNameToOtherLang(pokemon.name)
    const index = this.party.findIndex((p) => nameEn === p.name)
    if (index === -1) {
      this.party.push({ name: nameEn, isManagement: false })
      return
    }
    this.party.splice(index, 1)
  }

  async endSelect() {
    await firebase
      .firestore()
      .collection('party')
      .add({
        userUid: this.$store.state.loginUser.userUid,
        party: this.party,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    this.$router.push({ path: '/party' })
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
