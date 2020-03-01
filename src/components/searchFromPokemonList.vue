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
}
</style>
