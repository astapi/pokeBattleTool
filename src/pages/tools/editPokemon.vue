<template>
  <div class="container mx-auto relative">
    <section class="attacker-defender-setting-section flex flex-wrap">
      <section class="attacker border border-solid w-full p-4 lg:w-1/2 xl:w-1/2 m-2 shadow rounded">
        <SettingPokemonFrom :setNatures="true" :set-evs="true" @set-name="setNameAttacker" @set-move="setMoveAttacker" @set-item="setItemAttacker"/>
        <div class="flex justify-center">
          <button class="able-button" @click="save">save</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import SettingPokemonFrom from '@/components/settingPokemonForm.vue'
import * as calc from '@/calc/index'

@Component({
  components: {
    SettingPokemonFrom
  }
})
export default class DamageCalcurator extends Vue {
  pokemonData: PokemonData[] = require('@/data/pokeData.json').data;
  pokemonEnNameMap: any = require('@/data/pokemonNameEnMap.json');
  pokemonItemNameMap: {[index: string]: string} = require('@/data/itemNameLanguageMap.json');
  name: string = '';
  nameEn: string = '';
  move: string[] = [];
  moveEn: string[] = [];
  item: string = '';
  itemEn: string = '';
  evs: Partial<calc.StatsTable<number>> = {};
  calcPokemon: calc.Pokemon|undefined;
  calcMove: calc.Move|undefined;

  setNameAttacker(data: any) {
    this.name = data.name;
    this.nameEn = data.nameEn;
    this.pokemonData = data.pokemonData;
    this.createAttacker();
  }
  setMoveAttacker(data: any) {
    this.move = data.move;
    this.moveEn = data.moveEn;
    if (!this.calcPokemon) return;
    this.calcMove = new calc.Move(8, this.moveEn, {
      ability: this.calcPokemon.ability,
    });
  }
  setItemAttacker(data: any) {
    this.item = data.item;
    this.itemEn = data.itemEn;
    console.log(data);
    this.createAttacker();
  }

  createAttacker() {
    const params: any = {
      level: 50,
      evs: {
        atk: 252,
        spa: 252,
      },
    };
    if (this.itemEn !== '') {
      console.log('itemset');
      params.item = this.itemEn;
    }
    console.log(params);
    const attacker = new calc.Pokemon(8, this.nameEn, params);
    this.calcPokemon = attacker;
  }

  save() {
    console.log('save');
    if (!this.nameEn) return;
    const params: any = {
      level: 50,
      evs: {
        atk: 252,
        spa: 252,
      },
    };
    if (this.itemEn !== '') {
      console.log('itemset');
      params.item = this.itemEn;
    }
    console.log(params);
    const attacker = new calc.Pokemon(8, this.nameEn, params);
    this.calcPokemon = attacker;

    console.log('save done.');
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
