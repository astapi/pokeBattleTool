import { PokemonData, PokemonFromDB } from "@/interface/pokemon";

export interface BattleLogData {
  id: string;
  myParty: PokemonData[];
  enemyParty: PokemonData[];
  selectFromMyParty: PokemonFromDB[];
  selectFromEnemyParty: PokemonFromDB[];
  result: 'win'|'lose';
  battleType: 'single'|'double';
  createdAt: Date;
  updatedAt: Date;
}

export type BattleType = 'single'|'double';