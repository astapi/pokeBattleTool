<template>
  <div class="pokemon-image">
    <img :src="pokemonImageUrl" class="w-16" />
    <div v-if="itemImageUrl" class="item">
      <img :src="itemImageUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class PokemonImage extends Vue {
  @Prop() readonly pokemonImageUrl!: string
  @Prop() readonly itemImageUrl!: string
}
</script>

<style lang="scss" scoped>
.pokemon-image {
  position: relative;

  .item {
    position: absolute;
    top: 55px;
    left: 8px;
    width: 45px;
  }
}
</style>
