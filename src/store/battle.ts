import { PokemonData } from '../interface/pokemon';

export const state = () => ({
  enemyPokemonList: [],
  myPokemonList: [],
  selectedBattlePokemonFromTeam: [],
  battlePokemonDataList: []
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
  }
}