<template>
  <div class="search-from-pokemon-list">
    <div class="search-list overflow-scroll">
      <ManagePokemonList
        @select="select"
        :pokemon-list="list"
        class="flex flex-wrap justify-around"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ManagePokemonList from '@/components/managePokemonList.vue'
import { PokemonData, PokemonManagementData } from '@/interface/pokemon'
import firebase from 'firebase/app'
import 'firebase/firestore'

const pokeData = require('@/data/pokeData.json')

@Component({
  components: {
    ManagePokemonList
  }
})
export default class SearchFromPokemonManagementList extends Vue {
  list: (PokemonData & { pokemonManagementData: PokemonManagementData })[] = []
  pokemonEnNameMap: any = require('@/data/pokemonNameEnMap.json');

  async mounted() {
    // const mangagePokemonListSnap = await firebase.firestore().collection('pokemonManagementData')
    //   .where('userUid', '==', this.$store.state.loginUser.userUid)
    //   .get();
    // const mangagePokemonList: any[] = mangagePokemonListSnap.docs.map((doc) => {
    //   return { id: doc.id, ...doc.data() }
    // });
    // const nameEnList = mangagePokemonList.map((p) => p.pokemonEditData.name);
   
    // this.list = pokeData.data.filter((pokemonData: PokemonData) => {
    //   return nameEnList.includes(this.pokemonEnNameMap[pokemonData.gararuNo])
    // }).map((pokemonData: PokemonData) => {
    //   const nameEn = this.pokemonEnNameMap[pokemonData.gararuNo];
    //   return {
    //     ...pokemonData,
    //     nameEn,
    //     pokemonManagementData: mangagePokemonList.find((p) => p.pokemonEditData.name === nameEn)
    //   }
    // })
  }

  select(pokemon: PokemonData) {
    this.$emit('select', pokemon)
  }
}
</script>

<style lang="scss" scoped>
.search-from-pokemon-list {
}
</style>
