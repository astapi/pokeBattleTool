<template>
  <div class="container">
    <div class="mb-10 flex justify-center">
      <button @click="endSelect" class="able-button">
        相手のポケモン設定完了！
      </button>
    </div>
    <div class="search-list w-full mt-3 pl-5 border-solid">
      <SearchFromPokemonList
        @select="selectEnemy"
        :pokemon-list="pokemonDataList"
        class="flex flex-wrap justify-around"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '../interface/pokemon'
import SearchFromPokemonList from '@/components/searchFromPokemonList.vue'

@Component({
  components: {
    SearchFromPokemonList
  }
})
export default class SelectEnemy extends Vue {
  enemyParty: PokemonData[] = []

  get pokemonDataList() {
    return this.$store.state.battle.battlePokemonDataList
  }

  selectEnemy(pokemon: PokemonData) {
    const index = this.enemyParty.findIndex((p) => pokemon.name === p.name)
    if (index === -1) {
      this.enemyParty.push(pokemon)
      return
    }
    this.enemyParty.splice(index, 1)
  }

  endSelect() {
    this.$store.commit('battle/setEnemyPokemonList', this.enemyParty)
    this.$router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  @apply p-20;
}
</style>
