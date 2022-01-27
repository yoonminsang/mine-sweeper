export interface ILocation {
  row: number;
  column: number;
}
export interface IGameInitOption extends ILocation {
  mine: number;
}
export interface IDifficulty extends IGameInitOption {
  difficulty: TDifficulty;
}

export type TGraphCell = 'mine' | number;
export type TGraph = TGraphCell[][];
export type TCurrentGraphCell =
  | 'notSelect'
  | 'bombDeath'
  | 'bombRevealed'
  | 'bombmIsFlagged'
  | number
  | 'flag'
  | 'question';
export type TCurrentGraph = TCurrentGraphCell[][];
export type TDifficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';
