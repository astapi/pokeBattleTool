<template>
  <div class="pokemon-stats border border-solid rounded bg-gray-100 p-1 flex">
    <div>
      <ul>
        <li v-for="key of Object.keys(pokemon.calcPokemon.stats)" :key="key">
          {{ statsMap[key] }}
        </li>
      </ul>
    </div>
    <div class="ml-5">
      <ul>
        <li
          v-for="key of Object.keys(pokemon.calcPokemon.stats)"
          :key="key"
          class="font-bold"
        >
          {{ pokemon.calcPokemon.stats[key] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'

@Component({})
export default class PokemonStats extends Vue {
  @Prop() readonly pokemon!: PokemonData

  statsMap = {
    hp: 'HP',
    atk: 'こうげき',
    def: 'ぼうぎょ',
    spa: 'とくこう',
    spd: 'とくぼう',
    spe: 'すばやさ'
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
