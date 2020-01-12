<template>
  <div class="battle-log-party flex flex-wrap justify-around items-center w-40 h-48">
    <template v-for="pokemon of log[partyColumnName]">
      <PokemonImage
        :key="pokemon.name"
        :pokemon-image-url="storageUrl(pokemon.gifUrl)"
        class="pokemon-image w-12"
        :class="pokemonImageClass(log, pokemon, selectFromPartyColumnName)"
      /> 
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import { BattleLogData } from '@/interface/battoleLog'
import PokemonImage from '@/components/pokemon/pokemonImage.vue'

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
    let classString = log[type].includes(pokemon.zenkokuNo) ? 'select' : '';
    if (classString !== '') {
      classString = classString + ' ' + 'selectNo' + (log[type].findIndex((no: string) => no === pokemon.zenkokuNo) + 1).toString()
    }
    return classString;
  }

  baseUrl = 'https://storage.googleapis.com/poke-assets/pokemon/'
  storageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl.split('icon96/')[1]}`
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
  }
}
</style>
