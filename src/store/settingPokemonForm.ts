import * as calc from '@smogon/calc'

export const state = () => ({
  editPokemonData: {}
})

export const mutations = {
  setEditPokemonName(state: any, name: string) {
    state.editPokemonData.name = name
  },
  setEditPokemonMove(state: any, move: string) {
    state.editPokemonData.move = move
  },
  setEditPokemonItem(state: any, item: string) {
    state.editPokemonData.item = item
  },
  setEditPokemonEvs(state: any, evs: Partial<calc.StatsTable<number>>) {
    state.editPokemonData.evs = evs
  }
}
