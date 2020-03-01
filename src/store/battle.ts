import { PokemonData } from '@/interface/pokemon';
import { BattleType } from '~/interface/battoleLog';

// interface BattleState {
//   enemyPokemonList: PokemonData[];
//   myPokemonList: PokemonData[];
//   selectBattlePokemonFromTeam: PokemonData[];
//   battlePokemonDataList: PokemonData[];
//   battleType: BattleType;
// }

export const state = () => ({
  enemyPokemonList: [],
  myPokemonList: [],
  selectedBattlePokemonFromTeam: [],
  battlePokemonDataList: [],
  battleType: null,
})

export const mutations = {
  setMyPokemonList(state: any, list: PokemonData[]) {
    state.myPokemonList = list;
  },
  setSelectedBattlePokemonFromTeam(state: any, list: PokemonData[]) {
    state.selectedBattlePokemonFromTeam = list;
  },
  setEnemyPokemonList(state: any, list: PokemonData[]) {
    state.enemyPokemonList = list;
  },
  setBattlePokemonDataList(state: any, list: PokemonData[]) {
    state.battlePokemonDataList = list;
  },
  setBattleType(state: any, payload: BattleType) {
    state.battleType = payload;
  }
}