import { TypeName } from '@smogon/calc/dist/data/interface'
import * as calc from '@smogon/calc'

export interface PokemonData {
  // gifUrl: string;
  // zenkokuNo: string;
  // gararuNo: number;
  name: string
  calcPokemon: calc.Pokemon
  types: [TypeName] | [TypeName, TypeName]
  typeAisho: any
  imageUrl: string
  isManagement: boolean
  managementId?: string
  // nameEn?: string;
  // types: number[];
  // weekType: {[type: string]:number[]};
  // baseStats: Stats;
  // status: {[key: string]: Stats};
}

export interface PokemonManagementData {
  name: string
  moves?: string[]
  item?: string
  natures?: string
  evs?: Partial<calc.StatsTable<number>>
  ivs?: Partial<calc.StatsTable<number>>
}

export interface PartyPokemon {
  name: string
  zenkokuNo: string
  isManagement?: boolean
  pokemonManagementId?: string
}

export interface Stats {
  HP: number
  Attack: number
  Block: number
  SAttack: number
  SBlock: number
  Speed: number
}

export interface SpeedData {
  name: string
  imageUrl: string
  baseSpeed: number
  baseStatsSpeed: number
}

// DB
export interface PokemonFromDB {
  name: string
  isManagement?: boolean
  managementId?: string
}

export interface PartyFromDB {
  userUid: string
  party: PokemonFromDB[]
}
