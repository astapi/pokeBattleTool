<template>
  <div class="container" style="max-width: 1000px;">
    <div class="mb-10 flex justify-center">
      <button class="able-button" @click="endSelect">チーム設定完了！</button>
    </div>
    <div class="search-list w-full mt-3 pl-5 border-solid">
      <SearchFromPokemonList
        :pokemon-list="pokemonDataList"
        class="flex flex-wrap justify-around"
        @select="selectPokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import SearchFromPokemonList from '@/components/searchFromPokemonList.vue'

@Component({
  components: {
    SearchFromPokemonList
  }
})
export default class SelectTeam extends Vue {
  party: PokemonData[] = []

  get pokemonDataList() {
    return this.$store.state.battle.battlePokemonDataList
  }

  selectPokemon(pokemon: PokemonData) {
    const index = this.party.findIndex((p) => pokemon.name === p.name)
    if (index === -1) {
      this.party.push(pokemon)
      return
    }
    this.party.splice(index, 1)
  }

  endSelect() {
    this.$store.commit('battle/setMyPokemonList', this.party)
    this.$router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  @apply p-20;
}
</style>
