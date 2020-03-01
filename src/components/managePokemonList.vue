<template>
  <div class="pokemon-list border border-solid p-1">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.zenkokuNo"
      @click="select(pokemon)"
      class="mb-3 cursor-pointer w-24"
    >
      <PokemonImageAndName
        :image-url="storageUrl(pokemon.gifUrl)"
        :name="pokemon.name"
        :id="`select-box-pokemon-${pokemon.gararuNo}`"
      />
      <table class="table-auto bg-white rounded shadow">
        <thead>
          <tr>
            <th class="px-4 py-2">性格</th>
            <th class="px-4 py-2">アイテム</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2 text-center">{{ editData(pokemon).natures }}</td>
            <td class="border px-4 py-2 text-center">{{ editData(pokemon).items }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData, PokemonManagementData } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'

@Component({
  components: {
    PokemonImageAndName
  }
})
export default class ManagePokemonList extends Vue {
  @Prop() readonly pokemonList!: (PokemonData & { pokemonManagementData: PokemonManagementData })[]

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
  }

  select(pokemon: PokemonData) {
    if (process.client) {
      // const dom = document.querySelector(
      //   `#select-box-pokemon-${pokemon.gararuNo}`
      // )
      // if (!dom) return
      // dom.classList.toggle('selected')
      // this.$emit('select', pokemon)
    }
  }

  editData(pokemon: any): PokemonManagementData {
    return pokemon.pokemonManagementData.pokemonEditData;
  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  .selected {
    @apply bg-yellow-200;
  }
}
</style>
