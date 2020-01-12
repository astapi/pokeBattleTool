export interface PokemonData {
  gifUrl: string;
  zenkokuNo: string;
  gararuNo: number;
  name: string;
  types: number[];
  weekType: {[type: string]:number[]};
  baseStats: Stats;
  status: {[key: string]: Stats};
}

export interface Stats {
  HP: number;
  Attack: number;
  Block: number;
  SAttack: number;
  SBlock: number;
  Speed: number;
}

export interface SpeedData {
  icon: string
  name: string
  status: number
  correction: string
}
