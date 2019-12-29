<template>
  <div class="container" style="max-width: 1000px;">
    <div class="mb-10 flex justify-center">
      <button @click="endSelect" class="able-button">チーム設定完了！</button>
    </div>
    <div class="search-list w-full mt-3 pl-5 border-solid">
      <SearchFromPokemonList
        @select="selectPokemon"
        :pokemon-list="pokemonDataList"
        class="flex flex-wrap justify-around"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '../interface/pokemon'
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

  .able-button {
    @apply bg-blue-500 text-white font-bold py-2 px-1 border border-blue-700 rounded;

    &:hover {
      @apply bg-blue-700;
    }
  }
}
</style>
