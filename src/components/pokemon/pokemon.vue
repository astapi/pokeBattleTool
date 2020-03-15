<template>
  <div class="pokemon p-1" style="min-height: 0px;">
    <div class="flex relative">
      <div class="w-3/12">
        <PokemonImageAndName
          :image-url="pokemon.imageUrl"
          :item-no="1"
          :name="pokemon.name"
        />
        <div class="type-section flex flex-col justify-center">
          <template v-for="type of pokemon.types">
            <PokemonType :key="type" :type-name="type" />
          </template>
        </div>
      </div>
      <div class="right-section w-3/4">
        <div class="type-week-section">
          <PokemonTypeWeekList :week-data="pokemon.typeAisho" />
        </div>
      </div>
      <div class="stats-popup absolute hidden">ほげほげ</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonType from '@/components/pokemon/pokemonType.vue'
import PokemonTypeWeekList from '@/components/pokemon/pokemonTypeWeekList.vue'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
// https://cdn.bulbagarden.net/upload/b/b1/Dream_Assault_Vest_Sprite.png
@Component({
  components: {
    PokemonImageAndName,
    PokemonType,
    PokemonTypeWeekList
  }
})
export default class Pokemon extends Vue {
  @Prop() readonly pokemon!: PokemonData
  @Prop() readonly itemNo!: number

  get itemImageUrl() {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.pokemon {
  .text-xxs {
    font-size: 0.5em;
  }
}
</style>
