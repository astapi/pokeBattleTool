<template>
  <div class="search-from-pokemon-list">
    <div class="search-list overflow-scroll">
      <div class="search-text-input border border-solid">
        <input
          v-model="searchText"
          @input="debounceSearch"
          type="text"
          placeholder="ミミッキュ"
          class="w-full p-1"
        />
      </div>
      <PokemonList
        @select="select"
        :pokemon-list="pokemonList"
        max-select="maxSelect"
        class="flex flex-wrap justify-around"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { debounce } from 'lodash'
import PokemonList from '@/components/pokemonList.vue'
import { PokemonData } from '@/interface/pokemon'

@Component({
  components: {
    PokemonList
  }
})
export default class SearchFromPokemonList extends Vue {
  @Prop() readonly pokemonList!: PokemonData[]
  @Prop() maxSelect!: number;

  list: PokemonData[] = []
  searchText: string = ''

  get debounceSearch() {
    return debounce(this.search, 200)
  }

  search(event: any): void {
    if (event.data === null) {
      this.list = this.pokemonList
      return
    }
    if (!event.data) return
    this.list = this.pokemonList.filter((v) => v.name.includes(event.data))
  }

  select(pokemon: PokemonData) {
    this.$emit('select', pokemon)
  }
}
</script>

<style lang="scss" scoped>
.search-from-pokemon-list {
    &.selectNo1 {
    &:after {
      content: '1';
      position: absolute;
      bottom: -8px;
      right: -13px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #b2f5ea;
      border-radius: 50%;
      color: #1a202c;
    }
  }
  &.selectNo2 {
    &:after {
      content: '2';
      position: absolute;
      bottom: -8px;
      right: -13px;
      width: 25px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #b2f5ea;
      border-radius: 50%;
      color: #1a202c;
    }
  }
  &.selectNo3 {
    &:after {
      content: '3';
      position: absolute;
      bottom: -8px;
      right: -13px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #b2f5ea;
      border-radius: 50%;
      color: #1a202c;
    }
  }
  &.selectNo4 {
    &:after {
      content: '4';
      position: absolute;
      bottom: -8px;
      right: -13px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #b2f5ea;
      border-radius: 50%;
      color: #1a202c;
    }
  }
}
</style>
