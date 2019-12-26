<template>
  <div
    class="pokemon border border-solid rounded bg-gray-100 p-1"
    style="min-height: 0px;"
  >
    <div class="flex relative">
      <div>
        <PokemonImageAndName
          :image-url="storageUrl(pokemon.gifUrl)"
          :item-no="1"
          :name="pokemon.name"
        />
        <div class="type-section flex flex-col justify-center">
          <template v-for="type of pokemon.types">
            <PokemonType :type-no="type" :key="type" class="mt-2" />
          </template>
        </div>
      </div>
      <div class="right-section">
        <div class="type-week-section">
          <PokemonTypeWeekList :week-data="pokemon.weekType" />
        </div>
      </div>
      <div class="stats-popup absolute hidden">ほげほげ</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '../../interface/pokemon'
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

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
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
