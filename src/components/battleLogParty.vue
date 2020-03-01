<template>
  <div class="battle-log-party flex flex-wrap justify-around items-center w-40 h-48">
    <template v-for="pokemon of log[partyColumnName]">
      <PokemonImage
        :key="pokemon.name"
        :pokemon-image-url="pokemon.imageUrl"
        class="pokemon-image w-12"
        :class="pokemonImageClass(log, pokemon, selectFromPartyColumnName)"
      /> 
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData, PokemonFromDB } from '@/interface/pokemon'
import { BattleLogData } from '@/interface/battoleLog'
import PokemonImage from '@/components/pokemon/pokemonImage.vue'
import { changePokemonNameToOtherLang } from '../utils/common'

@Component({
  components: {
    PokemonImage,
  }
})
export default class battleLogParty extends Vue {
  @Prop() readonly log!: BattleLogData
  @Prop() readonly type!: 'my'|'enemy'

  get partyColumnName() {
    if (this.type === 'my') return 'myParty';
    return 'enemyParty';
  }

  get selectFromPartyColumnName() {
    if (this.type === 'my') return 'selectFromMyParty';
    return 'selectFromEnemyParty';
  }

  pokemonImageClass(log: BattleLogData, pokemon: PokemonData, type: 'selectFromMyParty'|'selectFromEnemyParty'): string {
    let classString = log[type].find((p) => p.name === changePokemonNameToOtherLang(pokemon.name)) ? 'select' : '';
    if (classString !== '') {
      classString = classString + ' ' + 'selectNo' + (log[type].findIndex((p) => p.name === changePokemonNameToOtherLang(pokemon.name)) + 1).toString()
    }
    return classString;
  }
}
</script>

<style lang="scss" scoped>
.battle-log-party {
  @apply bg-white shadow rounded p-3;

  .pokemon-image {
    &.select {}
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
}
</style>
