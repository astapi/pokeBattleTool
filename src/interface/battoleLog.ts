export interface BattleLogData {
  myParty: string[];
  enemyParty: string[];
  selectFromMyParty: string[];
  selectFromEnemyParty: string[];
  result: 'win'|'lose';
  createdAt: Date;
  updatedAt: Date;
}