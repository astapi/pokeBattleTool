<template>
  <PokemonParty :party-data="partyData" />
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
export default class enemyParty extends Vue {
  @Prop() readonly partyData!: PokemonData[]
}
</script>

<style lang="scss" scoped>
.enemy-party {
}
</style>
