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
    <SideMenu></SideMenu>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { VueLoading } from 'vue-loading-template'
import { PokemonData } from '@/interface/pokemon'
import SideMenu from '@/components/layouts/SideMenu.vue'
import { pokemonDataFromName } from '@/utils/common'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    VueLoading,
    SideMenu
  }
})
export default class Default extends Vue {
  created() {
    if (this.$store.state.battle.battlePokemonDataList.length !== 0) return

    // const pokeData = require('@/data/pokeData.json')
    const battleSelectPokemonNameList = require('@/data/galarBattlePokemonList.json')
    const list: PokemonData[] = battleSelectPokemonNameList.map(
      (name: string): PokemonData => {
        return pokemonDataFromName(name)
      }
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
  input,
  select {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    text-indent: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type='text'],
  textarea {
    outline: none;
    border: 1px solid #aaa;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  input[type='text']:focus,
  textarea:focus {
    box-shadow: 0 0 7px #1abc9c;
    border: 1px solid #1abc9c;
  }
}
.able-button {
  @apply bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow;

  &:hover {
    @apply bg-gray-100;
  }
}
.disable-button {
  @apply bg-white text-gray-800 font-bold py-2 px-1 rounded opacity-50 cursor-not-allowed shadow;
}
.flex,
.child-flex > * {
  flex: 0 1 auto;
}
.bm-burger-button {
  z-index: 10;
}
</style>
