<template>
  <div class="container mt-10">
    <div class="flex flex-col lg:flex-row">
      <Pokemon v-if="pokemon" :pokemon="pokemon" />
      <PokemonStats v-if="pokemon" :pokemon="pokemon" />
    </div>
    <div class="search-list w-full mt-3 pt-10 border-solid">
      <PokemonList
        :pokemon-list="pokemonDataList"
        max-select="maxSelect"
        :disable-select-no="true"
        class="flex flex-wrap justify-around"
        @select="select"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonList from '@/components/pokemonList.vue'
import Pokemon from '@/components/pokemon/pokemon.vue'
import PokemonStats from '@/components/pokemon/pokemonStats.vue'

@Component({
  components: {
    PokemonList,
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
    console.log(pokemon)
    this.pokemon = pokemon
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
