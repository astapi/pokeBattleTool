<template>
  <div :class="className">
    {{ typeList[lowerCaseTypeName] }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { TYPE_LIST } from '@/interface/pokemonType'

@Component({})
export default class PokemonType extends Vue {
  @Prop() readonly typeName!: string

  get typeList() {
    return TYPE_LIST
  }

  get lowerCaseTypeName(): string {
    return this.typeName.toLowerCase();
  }

  get className() {
    // const className = this.typeList[this.typeNo].class
    const className = this.lowerCaseTypeName;
    return `pokemon-type border border-solid rounded font-bold text-xxs text-center ${className}`
  }
}
</script>

<style lang="scss" scoped>
.pokemon-type {
}
.text-xxs {
  font-size: 0.5rem;
}
.normal {
  @apply bg-gray-400;
}
.fighting {
  @apply bg-gray-400;
}
.poison {
  @apply bg-purple-500;
}
.fire {
  @apply bg-red-600;
}
.rock {
  @apply bg-yellow-500;
}
.ground {
  @apply bg-yellow-800 text-white;
}
.bug {
  @apply bg-yellow-400;
}
.electric {
  @apply bg-yellow-500;
}
.grass {
  @apply bg-green-500;
}
.flying {
  @apply bg-indigo-400;
}
.water {
  @apply bg-blue-600 text-white;
}
.ice {
  @apply bg-indigo-200;
}
.steel {
  @apply bg-gray-500;
}
.ghost {
  @apply bg-indigo-800 text-white;
}
.dragon {
  @apply bg-indigo-600 text-white;
}
.fairy {
  @apply bg-pink-400;
}
.dark {
  @apply bg-blue-900 text-white;
}
</style>
