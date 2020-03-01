<template>
  <div
    class="pokemon-type-week-list flex flex-wrap justify-start mt-2 ml-1"
  >
    <div class="week-row ml-2" :key="key" v-for="(value, key) in weekData">
      <PokemonTypeWeek :week-magnification="key" :type-name-list="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PokemonTypeWeek from '@/components/pokemon/pokemonTypeWeek.vue'

// こういうデータ
// "weekType": {
// 	"×2": [
// 		9,
// 		6,
// 		3,
// 		2,
// 		14
// 	],
// 	"×0.5": [
// 		4,
// 		12,
// 		11,
// 		10
// 	]
// },

@Component({
  components: {
    PokemonTypeWeek
  }
})
export default class PokemonTypeWeekList extends Vue {
  @Prop() readonly weekData: any
}
</script>

<style lang="scss" scoped>
.pokemon-type-week-list {
  .week-row {
    max-width: 50%;
  }
}
</style>
