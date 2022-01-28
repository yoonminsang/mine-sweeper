import { TCurrentGraph, TGraph } from '@/types/game';

const pressMine = (graph: TGraph, nextCurrentGraph: TCurrentGraph, row: number, column: number) => {
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  for (let i = 0; i < graphRow; i++) {
    for (let j = 0; j < graphColumn; j++) {
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
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  const visit = Array(graphRow)
    .fill(null)
    .map(() => Array(graphColumn).fill(false));
  const changeGraph = (row: number, column: number) => {
    if (visit[row][column]) return;
    visit[row][column] = true;
    if (typeof graph[row][column] === 'number') nextCurrentGraph[row][column] = graph[row][column] as number;
    if (graph[row][column] !== 0) return;

    if (row + 1 < graphRow && column + 1 < graphColumn) changeGraph(row + 1, column + 1);
    if (row + 1 < graphRow && column - 1 >= 0) changeGraph(row + 1, column - 1);
    if (row - 1 >= 0 && column + 1 < graphColumn) changeGraph(row - 1, column + 1);
    if (row - 1 >= 0 && column - 1 >= 0) changeGraph(row - 1, column - 1);
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

const isSuccess = (graph: TGraph, nextCurrentGraph: TCurrentGraph, remainMine: number): boolean => {
  const notSelectCount = calc2DIncludeCount(nextCurrentGraph, 'notSelect');
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  if (remainMine === notSelectCount) {
    for (let i = 0; i < graphRow; i++) {
      for (let j = 0; j < graphColumn; j++) {
        if (nextCurrentGraph[i][j] === 'notSelect') {
          if (graph[i][j] === 'mine') nextCurrentGraph[i][j] = 'flag';
          else nextCurrentGraph[i][j] = graph[i][j] as number;
        }
      }
    }
    return true;
  }
  return false;
};

const checkPressSync = (graph: TGraph, currentGraph: TCurrentGraph, row: number, column: number) => {
  const currentGraphValue = currentGraph[row][column];
  if (!(typeof currentGraphValue === 'number' && currentGraphValue > 0)) return;
  const [graphRow, graphColumn] = [currentGraph.length, currentGraph[0].length];
  let count = 0;
  const locationArr: number[][] = [];
  for (let i = Math.max(0, row - 1); i <= Math.min(graphRow - 1, row + 1); i++) {
    for (let j = Math.max(0, column - 1); j <= Math.min(graphColumn - 1, column + 1); j++) {
      if (currentGraph[i][j] === 'flag') {
        count += 1;
      } else if (currentGraph[i][j] === 'notSelect') {
        locationArr.push([i, j]);
      }
    }
  }
  if (count === currentGraphValue) {
    locationArr.forEach(([row, column]) => {
      currentGraph[row][column] = graph[row][column] as number;
      if (currentGraph[row][column] === 0) pressEmpty(graph, currentGraph, row, column);
    });
  }
};

export { pressMine, pressEmpty, isSuccess, checkPressSync };
