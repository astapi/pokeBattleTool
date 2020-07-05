<template>
  <div class="pokemon-type-week">
    <p class="font-bold text-sm">x{{ weekMagnification }}</p>
    <div class="flex flex-wrap">
      <div v-for="typeName in typeNameList" :key="typeName" class="type-item">
        <PokemonType :type-name="typeName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { TypeName } from '@smogon/calc/dist/data/interface'
import { TYPE_LIST } from '@/interface/pokemonType'
import PokemonType from '@/components/pokemon/pokemonType.vue'

@Component({
  components: {
    PokemonType
  }
})
export default class PokemonTypeWeek extends Vue {
  @Prop() readonly weekMagnification!: string
  @Prop() readonly typeNameList!: TypeName[]

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
