<template>
  <div class="container">
    <div class="flex">
      <Pokemon v-if="pokemon" :pokemon="pokemon" />
      <PokemonStats v-if="pokemon" :pokemon="pokemon" />
    </div>
    <div class="search-list w-full mt-3 pt-10 border-solid">
      <SearchFromPokemonList
        @select="select"
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
import Pokemon from '@/components/pokemon/pokemon.vue'
import PokemonStats from '@/components/pokemon/pokemonStats.vue'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    SearchFromPokemonList,
    Pokemon,
    PokemonStats
  }
})
export default class SelectEnemy extends Vue {
  pokemon: PokemonData | null = null

  get pokemonDataList() {
    return this.$store.state.battle.battlePokemonDataList
  }

  select(pokemon: PokemonData) {
    this.pokemon = pokemon
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
