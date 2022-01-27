export interface ILocation {
  row: number;
  column: number;
}

export interface IGameInitOption extends ILocation {
  mine: number;
}

export type TGraph = ('mine' | number | null)[][];
export type TCurrentGraph = ('notSelect' | 'mine' | number | null | 'question')[][];
export type TDifficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';

export interface IDifficulty {
  difficulty: TDifficulty;
  mine?: number;
  row?: number;
  column?: number;
}
// TODO: notSelect 변수명 수정?
