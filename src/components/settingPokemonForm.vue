<template>
  <div>
    <section class="pokemon-name-setting-section setting-section">
      <input
        v-model="name"
        @input="setPokemonName"
        class="w-10/12 h-10"
        list="pokemonNameList"
        type="text"
        placeholder="ポケモン名"
      />
      <datalist id="pokemonNameList">
        <option v-for="name of pokemonNameListJa" :key="name" :value="name" />
      </datalist>
    </section>

    <section v-if="setNatures" class="pokemon-natures-setting-section setting-section">
      <input
        v-model="natures"
        class="w-10/12 h-10"
        list="pokemonNaturesList"
        type="text"
        placeholder="性格"
      />
      <datalist id="pokemonNaturesList">
        <option value="いじっぱり" />
        <option value="ようき" />
        <option value="おくびょう" />
        <option value="わんぱく" />
        <option value="ずぶとい" />
      </datalist>
    </section>

    <section class="pokemon-item-setting-section setting-section">
      <input
        v-model="item"
        @input="setPokemonItem"
        class="w-10/12 h-10"
        list="pokemonItemList"
        type="text"
        placeholder="アイテム"
      />
      <datalist id="pokemonItemList">
        <option v-for="name of pokemonItemListJa" :key="name" :value="name" />
      </datalist>
    </section>

    <section v-if="!isDefender" class="pokemon-move-setting-section flex-col setting-section">
      <div v-for="index of [0,1,2,3]" :key="index" class="mb-1 flex justify-center">
        <input
          v-model="moves[index]"
          @input="setPokemonMove"
          class="w-10/12 h-10"
          list="pokemonMoveList"
          type="text"
          :placeholder="`技${index+1}`"
        />
      </div>
      <datalist id="pokemonMoveList">
        <option v-for="name of pokemonMoveListJa" :key="name" :value="name" />
      </datalist>
    </section>

    <section v-if="setEvs" class="setting-section flex-col">
      <p class="mb-2 font-bold">努力値</p>
      <div class="flex">
        <div class="evs-input">
          <p class="text-center">hp</p>
          <input type="text" />
        </div>
        <div class="evs-input">
          <p class="text-center">atc</p>
          <input type="text" :value="252" />
        </div>
        <div class="evs-input">
          <p class="text-center">def</p>
          <input type="text" />
        </div>
        <div class="evs-input">
          <p class="text-center">spa</p>
          <input type="text" />
        </div>
        <div class="evs-input">
          <p class="text-center">spd</p>
          <input type="text" />
        </div>
        <div class="evs-input">
          <p class="text-center">spe</p>
          <input type="text" :value="252" />
        </div>
      </div>
    </section>

    <section v-if="setIvs" class="setting-section flex-col">
      <p class="mb-2 font-bold">個体値</p>
      <div class="flex">
        <div class="evs-input">
          <p class="text-center">hp</p>
          <input type="text" :value="31" />
        </div>
        <div class="evs-input">
          <p class="text-center">atc</p>
          <input type="text" :value="31" />
        </div>
        <div class="evs-input">
          <p class="text-center">def</p>
          <input type="text" :value="31" />
        </div>
        <div class="evs-input">
          <p class="text-center">spa</p>
          <input type="text" :value="31" />
        </div>
        <div class="evs-input">
          <p class="text-center">spd</p>
          <input type="text" :value="31" />
        </div>
        <div class="evs-input">
          <p class="text-center">spe</p>
          <input type="text" :value="31" />
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'

@Component
export default class SettingPokemonForm extends Vue {
  @Prop({ default: false }) readonly isDefender!: boolean;
  @Prop({ default: false }) readonly setNatures!: boolean;
  @Prop({ default: false }) readonly setEvs!: boolean;
  @Prop({ default: false }) readonly setIvs!: boolean;

  pokemonData: PokemonData[] = require('@/data/pokeData.json').data;
  pokemonEnNameMap: any = require('@/data/pokemonNameEnMap.json');
  pokemonItemNameMap: {[index: string]: string} = require('@/data/itemNameLanguageMap.json');

  name: string = '';
  nameEn: string = '';
  natures: string = '';
  naturesEn: string = '';
  moves: string[] = [''];
  movesEn: string[] = [];
  item: string = '';
  itemEn: string = '';
  pokemon: PokemonData|null = null;

  get pokemonNameListJa(): string[] {
    return this.pokemonData.map((pokemon) => pokemon.name)
  }

  get pokemonMoveListJa(): string[] {
    return ['かえんボール', 'ふいうち']
  }

  get pokemonItemListJa(): string[] {
    let index = 0;
    return Object.keys(this.pokemonItemNameMap).filter((itemName) => { 
      const bool = index % 2 === 0
      index++;
      return bool;
    });
  }

  setPokemonName() {
    const pokemon = this.pokemonData.filter((pokemon) => this.name === pokemon.name);
    if (pokemon.length === 0) return;
    this.pokemon = pokemon[0];
    this.nameEn = this.pokemonEnNameMap[this.pokemon.gararuNo];

    this.$emit('set-name', {
      pokemonData: pokemon[0],
      name: this.pokemon.name,
      nameEn: this.nameEn,
    });
  }

  setPokemonMove(e) {
    const map: any = {
      'かえんボール': 'Pyro Ball',
      'Pyro Ball': 'かえんボール',
      'ふいうち': 'Sucker Punch',
      'Sucker Punch': 'ふいうち'
    }
    // this..moveEn = map[this.move];
    // this.$emit('set-move', {
    //   move: this.move,
    //   moveEn: this.moveEn,
    // });
  }

  setPokemonItem() {
    const itemEn = this.pokemonItemNameMap[this.item];
    if (!itemEn) return;
    this.itemEn = itemEn;
    this.$emit('set-item', {
      item: this.item,
      itemEn: this.itemEn,
    });
  }
}
</script>

<style lang="scss" scoped>
.setting-section {
  @apply my-4 flex justify-center;
}
.evs-input {
  width: 18%;
  input {
    width: 100%;
  }
  @apply mr-1 flex-col;
}
</style>