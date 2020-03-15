<template>
  <div class="container">
    <div class="flex">
      <Pokemon v-if="pokemon" :pokemon="pokemon" />
      <PokemonStats v-if="pokemon" :pokemon="pokemon" />
    </div>
    <div class="search-list w-full mt-3 pt-10 border-solid">
      <SearchFromPokemonList
        :pokemon-list="pokemonDataList"
        class="flex flex-wrap justify-around"
        @select="select"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
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
}
</style>
