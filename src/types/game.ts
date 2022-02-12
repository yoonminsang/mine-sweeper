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

export type TGraphCell = 'mine' | TNumber;
export type TGraph = TGraphCell[][];
export type TCurrentGraphCell =
  | 'notSelect'
  | 'bombDeath'
  | 'bombRevealed'
  | 'bombmIsFlagged'
  | TNumber
  | 'flag'
  | 'question';
export type TCurrentGraph = TCurrentGraphCell[][];
export type TDifficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';
export type TFace = 'smile' | 'dead' | 'win';
export type TNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TTimer = '-' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
