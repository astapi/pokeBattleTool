<template>
  <div class="pokemon-list border border-solid p-1">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.zenkokuNo"
      @click="select(pokemon)"
      class="mb-3 cursor-pointer w-24"
    >
      <PokemonImageAndName
        :image-url="storageUrl(pokemon.gifUrl)"
        :name="pokemon.name"
        :id="`select-box-pokemon-${pokemon.gararuNo}`"
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

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
  }

  select(pokemon: PokemonData) {
    if (process.client) {
      const dom = document.querySelector(
        `#select-box-pokemon-${pokemon.gararuNo}`
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
