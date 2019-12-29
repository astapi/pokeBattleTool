<template>
  <PokemonParty :party-data="partyData" @select="select" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '../interface/pokemon'
import PokemonParty from '@/components/pokemonParty.vue'

@Component({
  components: {
    PokemonParty
  }
})
export default class myParty extends Vue {
  @Prop() readonly partyData!: PokemonData[]

  select(pokemon: PokemonData) {
    this.$emit('select', pokemon)
  }
}
</script>

<style lang="scss" scoped>
.my-party {
}
</style>
