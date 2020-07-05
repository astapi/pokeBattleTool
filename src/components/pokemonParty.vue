<template>
  <div class="pokemon-party flex flex-wrap justify-around">
    <div
      v-for="pokemon of partyData"
      :key="pokemon.name"
      class="w-2/4"
      @click="select(pokemon)"
    >
      <Pokemon
        :class="selectPokemonNameList.includes(pokemon.name) ? 'selected' : ''"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import Pokemon from '@/components/pokemon/pokemon.vue'

@Component({
  components: {
    Pokemon
  }
})
export default class PokemonParty extends Vue {
  @Prop() readonly partyData!: PokemonData[]
  selectPokemonNameList: string[] = []
  maxSelect: number = 6

  select(pokemon: PokemonData) {
    this.$emit('select', pokemon)
    const index = this.selectPokemonNameList.findIndex(
      (name) => pokemon.name === name
    )
    if (index === -1) {
      if (this.selectPokemonNameList.length === this.maxSelect) return
      this.selectPokemonNameList.push(pokemon.name)
      return
    }
    this.selectPokemonNameList.splice(index, 1)
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
