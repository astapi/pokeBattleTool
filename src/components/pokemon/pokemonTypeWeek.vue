<template>
  <div class="pokemon-type-week">
    <p class="font-bold text-center">{{ weekMagnification }}</p>
    <ul>
      <li :key="typeNo" v-for="typeNo in typeNoList">
        <PokemonType :type-no="typeNo" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { TYPE_LIST } from '@/interface/pokemonType'
import PokemonType from '@/components/pokemon/pokemonType.vue'

@Component({
  components: {
    PokemonType
  }
})
export default class PokemonTypeWeek extends Vue {
  @Prop() readonly weekMagnification!: string
  @Prop() readonly typeNoList!: number[]

  get typeList() {
    return TYPE_LIST
  }
}
</script>

<style lang="scss" scoped>
.pokemon-type-week {
}
</style>
