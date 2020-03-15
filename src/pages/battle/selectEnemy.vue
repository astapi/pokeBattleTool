<template>
  <div class="container mt-20 lg:mt-0 lg:p-20">
    <div class="mb-10 flex justify-center">
      <button class="able-button" @click="endSelect">
        相手のポケモン設定完了！
      </button>
    </div>
    <div class="search-list w-full mt-3 border-solid lg:px-40">
      <PokemonList
        :pokemon-list="pokemonDataList"
        max-select="maxSelect"
        class="flex flex-wrap justify-around"
        @select="selectEnemy"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonList from '@/components/pokemonList.vue'

@Component({
  components: {
    PokemonList
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
      if (this.enemyParty.length === 6) return
      this.enemyParty.push(pokemon)
      return
    }
    this.enemyParty.splice(index, 1)
  }

  endSelect() {
    this.$store.commit('battle/setEnemyPokemonList', this.enemyParty)
    this.$router.push({ path: '/battle/entry' })
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
