import * as calc from '@smogon/calc'

export interface EditPokemonData {
  name: string
  move: string
  item: string
  evs: Partial<calc.StatsTable<number>>
}
