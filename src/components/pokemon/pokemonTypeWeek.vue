<template>
  <div class="pokemon-type-week">
    <p class="font-bold text-sm">x{{ weekMagnification }}</p>
    <div class="flex flex-wrap">
      <div class="type-item" :key="typeName" v-for="typeName in typeNameList">
        <PokemonType :type-name="typeName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { TYPE_LIST } from '@/interface/pokemonType'
import PokemonType from '@/components/pokemon/pokemonType.vue'
import { Type } from '../../calc/data/types'

@Component({
  components: {
    PokemonType
  }
})
export default class PokemonTypeWeek extends Vue {
  @Prop() readonly weekMagnification!: string
  @Prop() readonly typeNameList!: Type[]

  get typeList() {
    return TYPE_LIST
  }
}
</script>

<style lang="scss" scoped>
.pokemon-type-week {
  .type-item {
  }
}
</style>
