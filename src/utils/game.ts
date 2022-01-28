import { TCurrentGraph, TGraph } from '@/types/game';

const pressMine = (graph: TGraph, nextCurrentGraph: TCurrentGraph, row: number, column: number) => {
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      if (typeof nextCurrentGraph[i][j] === 'number') continue;
      if (nextCurrentGraph[i][j] === 'flag') {
        if (graph[i][j] !== 'mine') {
          nextCurrentGraph[i][j] = 'bombmIsFlagged';
          continue;
        }
      } else if (graph[i][j] === 'mine') {
        nextCurrentGraph[i][j] = 'bombRevealed';
        continue;
      }
    }
  }
  nextCurrentGraph[row][column] = 'bombDeath';
};

const pressEmpty = (graph: TGraph, nextCurrentGraph: TCurrentGraph, row: number, column: number) => {
  const graphRow = graph.length;
  const graphColumn = graph[0].length;
  const visit = Array(graphRow)
    .fill(null)
    .map(() => Array(graphColumn).fill(false));
  const changeGraph = (row: number, column: number) => {
    if (visit[row][column]) return;
    visit[row][column] = true;
    if (typeof graph[row][column] === 'number') nextCurrentGraph[row][column] = graph[row][column] as number;
    if (graph[row][column] !== 0) return;
    // 동서남북
    if (column + 1 < graphColumn) changeGraph(row, column + 1);
    if (column - 1 >= 0) changeGraph(row, column - 1);
    if (row - 1 >= 0) changeGraph(row - 1, column);
    if (row + 1 < graphRow) changeGraph(row + 1, column);
  };
  changeGraph(row, column);
};

const calc2DIncludeCount = (nextCurrentGraph: TCurrentGraph, value: string): number => {
  const count = nextCurrentGraph.reduce((acc, cur) => {
    const rowCount = cur.filter((v) => v === value).length;
    return acc + rowCount;
  }, 0);
  return count;
};

const isSuccess = (nextCurrentGraph: TCurrentGraph, remainMine: number): boolean => {
  const notSelectCount = calc2DIncludeCount(nextCurrentGraph, 'notSelect');
  return remainMine === notSelectCount;
};

export { pressMine, pressEmpty, isSuccess };
