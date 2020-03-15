<template>
  <div class="pokemon-list border border-solid p-1">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.zenkokuNo"
      class="mb-3 cursor-pointer w-24"
      @click="select(pokemon)"
    >
      <PokemonImageAndName
        :image-url="pokemon.imageUrl"
        :name="pokemon.name"
        :class="
          selectPokemonNameList.includes(pokemon.name)
            ? `relative selected selectNo${index(pokemon.name)}`
            : ''
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import PokemonImageAndName from '@/components/pokemon/pokemonImageAndName.vue'

@Component({
  components: {
    PokemonImageAndName
  }
})
export default class PokemonList extends Vue {
  @Prop() readonly pokemonList!: PokemonData[]
  @Prop() maxSelect!: number
  @Prop() disableSelectNo: boolean = false
  selectPokemonNameList: string[] = []

  select(pokemon: PokemonData) {
    this.$emit('select', pokemon)
    if (this.disableSelectNo) return
    const index = this.selectPokemonNameList.findIndex(
      (name) => pokemon.name === name
    )
    if (index === -1) {
      if (this.selectPokemonNameList.length === this.maxSelect) return
      this.selectPokemonNameList.push(pokemon.name)
      return
    }
    this.selectPokemonNameList.splice(index, 1)
  }

  index(name: string) {
    return this.selectPokemonNameList.findIndex((n) => n === name) + 1
  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  .selected {
    @apply bg-yellow-200;
  }
  .selectNo1 {
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
  .selectNo2 {
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
  .selectNo3 {
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
  .selectNo4 {
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
  .selectNo5 {
    &:after {
      content: '5';
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
  .selectNo6 {
    &:after {
      content: '6';
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
