<template>
  <div class="pokemon-image-and-name flex flex-col">
    <div class="mx-auto">
      <PokemonImage
        :pokemon-image-url="imageUrl"
        :item-image-url="itemImageUrl"
      />
    </div>
    <p class="text-xxs font-bold text-center">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PokemonImage from '@/components/pokemon/pokemonImage.vue'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
// https://cdn.bulbagarden.net/upload/b/b1/Dream_Assault_Vest_Sprite.png
@Component({
  components: {
    PokemonImage
  }
})
export default class PokemonImageAndName extends Vue {
  @Prop() readonly imageUrl!: string
  @Prop() readonly itemNo!: number
  @Prop() readonly name!: string

  get itemImageUrl() {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.pokemon-image-and-name {
  .text-xxs {
    font-size: 0.5em;
  }
}
</style>
