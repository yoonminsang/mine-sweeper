export interface ILocation {
  row: number;
  column: number;
}

export interface IGameInitOption extends ILocation {
  mine: number;
}

export type TGraph = ('mine' | number | null)[][];
export type TCurrentGraph = ('notSelect' | 'mine' | number | null | 'question')[][];
