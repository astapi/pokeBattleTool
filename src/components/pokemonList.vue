<template>
  <div class="pokemon-list border border-solid p-1">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.zenkokuNo"
      @click="select(pokemon)"
      class="mb-3 cursor-pointer w-24"
    >
      <PokemonImageAndName
        :image-url="pokemon.imageUrl"
        :name="pokemon.name"
        :id="`select-box-pokemon-${pokemon.name}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'

@Component({
  components: {
    PokemonImageAndName
  }
})
export default class PokemonList extends Vue {
  @Prop() readonly pokemonList!: PokemonData[]

  select(pokemon: PokemonData) {
    if (process.client) {
      const dom = document.querySelector(
        `#select-box-pokemon-${pokemon.name}`
      )
      if (!dom) return
      dom.classList.toggle('selected')
      this.$emit('select', pokemon)
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  .selected {
    @apply bg-yellow-200;
  }
}
</style>
