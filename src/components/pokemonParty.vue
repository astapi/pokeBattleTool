<template>
  <div class="pokemon-party flex flex-wrap justify-around">
    <div
      @click="select(pokemon)"
      :key="pokemon.name"
      v-for="pokemon of partyData"
    >
      <Pokemon :id="`pokemon-${pokemon.gararuNo}`" :pokemon="pokemon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '../interface/pokemon'
import Pokemon from '@/components/pokemon/pokemon.vue'

@Component({
  components: {
    Pokemon
  }
})
export default class PokemonParty extends Vue {
  @Prop() readonly partyData!: PokemonData[]

  select(pokemon: PokemonData) {
    if (process.client) {
      const dom = document.querySelector(`#pokemon-${pokemon.gararuNo}`)
      if (!dom) return
      dom.classList.toggle('selected')
      this.$emit('select', pokemon)
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-party {
  .selected {
    @apply bg-yellow-200;
  }
}
</style>
