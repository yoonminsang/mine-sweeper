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

export type TGraphCell = 'mine' | number | null;
export type TGraph = TGraphCell[][];
export type TCurrentGraphCell = 'notSelect' | 'mine' | number | null | 'question';
export type TCurrentGraph = TCurrentGraphCell[][];
export type TDifficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';

// TODO: notSelect 변수명 수정?
