<template>
  <v-app>
    <section class="pokemon-name-setting-section setting-section mb-0 relative flex flex-col">
      <div class="absolute text-red-600" style="top: 10px; left: -3px;">*</div>
      <div v-if="!validName" class="text-xs text-red-600">ポケモン名は必須です</div>
      <div class="w-full">
        <v-autocomplete
          class="autocomplete"
          v-model="name"
          :items="pokemonNameListJa"
          placeholder="ポケモン名"
          rounded
          @input="inputName"
        ></v-autocomplete>
        <!-- <button class="able-button w-4/12 text-xs ml-5 h-10">一覧から選択</button> -->
      </div>
    </section>

    <section v-if="setNatures" class="pokemon-natures-setting-section setting-section mb-0">
      <div class="w-full">
        <v-autocomplete
          class="autocomplete"
          v-model="natures"
          :items="pokemonNaturesListJa"
          placeholder="性格"
          rounded
          @input="inputNatures"
        ></v-autocomplete>
      </div>
    </section>

    <section class="pokemon-item-setting-section setting-section">
       <div class="w-full">
        <v-autocomplete
          class="autocomplete"
          v-model="item"
          :items="pokemonItemListJa"
          placeholder="アイテム"
          rounded
          @input="inputItem"
        ></v-autocomplete>
      </div>
    </section>

    <section v-if="!isDefender" class="pokemon-move-setting-section flex-col setting-section">
      <div v-for="index of [0,1,2,3]" :key="index" class="mb-0 flex justify-center">
        <div class="w-full">
          <v-autocomplete
            class="autocomplete"
            v-model="moves[index]"
            :items="pokemonMoveListJa"
            :placeholder="`技${index+1}`"
            rounded
            @input="inputMove"
          ></v-autocomplete>
        </div>
      </div>
    </section>

    <section v-if="setEvs" class="setting-section-evs-ivs flex-col">
      <p class="mb-2 ml-7 font-bold">努力値</p>
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

    <section v-if="setIvs" class="setting-section-evs-ivs flex-col">
      <p class="mb-2 ml-7 font-bold">個体値</p>
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

  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'

@Component({})
export default class SettingPokemonForm extends Vue {
  @Prop({ default: false }) readonly isDefender!: boolean;
  @Prop({ default: false }) readonly setNatures!: boolean;
  @Prop({ default: false }) readonly setEvs!: boolean;
  @Prop({ default: false }) readonly setIvs!: boolean;
  @Prop({ default: '' }) readonly name!: string;
  @Prop({ default: true }) readonly validName!: boolean;

  pokemonData: PokemonData[] = require('@/data/pokeData.json').data;
  pokemonEnNameMap: any = require('@/data/pokemonNameEnMap.json');
  pokemonItemNameMap: {[index: string]: string} = require('@/data/itemNameLanguageMap.json');
  pokemonNaturesNameMpa: {[index: string]: string} = require('@/data/natures.json');
  pokemonMoveNameMap: {[index: string]: string} = require('@/data/pokemonMoveEnMap.json');

  // name: string = '';
  natures: string = '';
  moves: string[] = [''];
  item: string = '';
  pokemon: PokemonData|null = null;
  search: string = '';

  get pokemonNameListJa(): any[] {
    return [];
    // const ret = this.pokemonData.map((pokemon) => {
    //   return {
    //     text: pokemon.name,
    //     value: this.pokemonEnNameMap[pokemon.gararuNo],
    //   }
    // });
    // return ret;
  }

  get pokemonNaturesListJa(): string[] {
    let index = 0;
    const ret: any[] = [];
    const list = Object.keys(this.pokemonNaturesNameMpa);
    for (const key of list) {
      if (index % 2 === 0) {
        ret.push({
          text: key,
          value: list[index + 1],
        });
      }
      index++;
    }
    return ret;
  }

  get pokemonMoveListJa(): string[] {
    let index = 0;
    const ret: string[] = [];
    for (const key of Object.keys(this.pokemonMoveNameMap)) {
      if (index % 2 === 0) {
        ret.push(key);
      }
      index++;
    }
    return ret;
  }

  get pokemonItemListJa(): string[] {
    let index = 0;
    const ret: any[] = [];
    const list =  Object.keys(this.pokemonItemNameMap);
    for (const key of list) {
      if (index % 2 === 0) {
        ret.push({
          text: key,
          value: list[index + 1],
        });
      }
      index++;
    }
    return ret;
  }

  inputName(name: string) {
    this.$emit('input-name', name);
  }

  inputNatures(natures: string) {
    this.$emit('input-natures', natures);
  }

  inputItem(item: string) {
    this.$emit('input-item', item);
  }

  inputMove() {
    this.$emit('input-move', this.moves);
  }
}
</script>

<style lang="scss" scoped>
.setting-section {
  @apply my-2 flex justify-center px-4;
}
.setting-section-evs-ivs {
  @apply my-2 flex justify-center;
}
.evs-input {
  width: 13%;
  input {
    width: 100%;
  }
  @apply mr-3 flex-col;
}
</style>

<style lang="scss">
.v-application {
  background-color: #fff !important;
}
.v-application--wrap {
  min-height: 0 !important;
}
.v-input {
  margin: 0;
  padding: 0;
}
.v-input__slot {
  padding: 0 !important;
  margin: 0 !important;
}
.v-select__slot {
  input {
    border-radius: 0.25rem;
    height: 2.5rem;
    max-height: 2.5rem;
    padding: 0 !important;

    &::placeholder {
      color: #a0aec0 !important;
    }
  }
}
</style>