<template>
  <div>
    <div
      v-show="$store.state.isLoading"
      class="flex flex-col justify-center"
      style="height: 100vh;"
    >
      <vue-loading
        :size="{ width: '100px', height: '100px' }"
        class="ml-5"
        type="bars"
        color="#d9544e"
      ></vue-loading>
    </div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { VueLoading } from 'vue-loading-template'
import { PokemonData } from '../interface/pokemon'


// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    VueLoading
  }
})
export default class Default extends Vue {
  created() {
    if (this.$store.state.battle.battlePokemonDataList.length !== 0) return;

    const pokeData = require('@/data/pokeData.json')
    const battleSelectPokemonNoList = require('@/data/battlePokemonNoList.json')
    const noList = battleSelectPokemonNoList
    const list: PokemonData[] = pokeData.data.filter((v: PokemonData) =>
      noList.includes(v.zenkokuNo)
    )
    list.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      return -1
    })
    this.$store.commit('battle/setBattlePokemonDataList', list)
  }
}
</script>

<style lang="scss">
html {
  background-color: #f5f4f1;
  font-family: sans-serif;
}
.able-button {
  @apply bg-blue-500 text-white font-bold py-2 px-1 border border-blue-700 rounded;

  &:hover {
    @apply bg-blue-700;
  }
}
.disable-button {
  @apply bg-blue-500 text-white font-bold py-2 px-1 rounded opacity-50 cursor-not-allowed;
}
</style>
