import * as calc from '@/calc/index'

export interface EditPokemonData {
  name: string;
  move: string;
  item: string;
  evs: Partial<calc.StatsTable<number>>;
}