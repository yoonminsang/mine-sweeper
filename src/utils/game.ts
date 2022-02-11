import { TCurrentGraph, TGraph, TNumber } from '@/types/game';

const pressMine = (graph: TGraph, currentGraph: TCurrentGraph, row: number, column: number) => {
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  for (let i = 0; i < graphRow; i++) {
    for (let j = 0; j < graphColumn; j++) {
      if (typeof currentGraph[i][j] === 'number') continue;
      if (graph[i][j] === 'mine' && currentGraph[i][j] === 'flag') continue;
      if (graph[i][j] === 'mine' && currentGraph[i][j] !== 'flag') {
        currentGraph[i][j] = 'bombRevealed';
        continue;
      }
      if (graph[i][j] !== 'mine' && currentGraph[i][j] === 'flag') {
        currentGraph[i][j] = 'bombmIsFlagged';
        continue;
      }
    }
  }
  currentGraph[row][column] = 'bombDeath';
};

const pressEmpty = (graph: TGraph, currentGraph: TCurrentGraph, row: number, column: number) => {
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  const visit = Array(graphRow)
    .fill(null)
    .map(() => Array(graphColumn).fill(false));
  const changeGraph = (row: number, column: number) => {
    if (visit[row][column]) return;
    visit[row][column] = true;
    if (typeof graph[row][column] === 'number') currentGraph[row][column] = graph[row][column] as TNumber;
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

const pressRight = (currentGraph: TCurrentGraph, remainMine: number, row: number, column: number) => {
  const currentGraphCell = currentGraph[row][column];
  // eslint-disable-next-line default-case
  switch (currentGraphCell) {
    case 'notSelect':
      currentGraph[row][column] = 'flag';
      remainMine -= 1;
      break;
    case 'flag':
      currentGraph[row][column] = 'question';
      remainMine += 1;
      break;
    case 'question':
      currentGraph[row][column] = 'notSelect';
      break;
  }
  return remainMine;
};

const calcRemainCount = (currentGraph: TCurrentGraph): number => {
  const count = currentGraph.reduce((acc, cur) => {
    const rowCount = cur.filter((v) => ['question', 'notSelect'].includes(String(v))).length;
    return acc + rowCount;
  }, 0);
  return count;
};

const isSuccess = (currentGraph: TCurrentGraph, remainMine: number): boolean => {
  const remainCount = calcRemainCount(currentGraph);
  return remainMine === remainCount;
};

const chagneGraphWhenSuccess = (graph: TGraph, currentGraph: TCurrentGraph) => {
  const [graphRow, graphColumn] = [graph.length, graph[0].length];
  for (let i = 0; i < graphRow; i++) {
    for (let j = 0; j < graphColumn; j++) {
      if (currentGraph[i][j] === 'notSelect') {
        if (graph[i][j] === 'mine') currentGraph[i][j] = 'flag';
        else currentGraph[i][j] = graph[i][j] as TNumber;
      }
    }
  }
};

const pressSyncHelper = (currentGraph: TCurrentGraph, row: number, column: number) => {
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
  return { count, locationArr };
};

const pressSync = (graph: TGraph, currentGraph: TCurrentGraph, row: number, column: number) => {
  const currentGraphValue = currentGraph[row][column];
  if (!(typeof currentGraphValue === 'number' && currentGraphValue > 0)) return;
  const { count, locationArr } = pressSyncHelper(currentGraph, row, column);

  if (count === currentGraphValue) {
    locationArr.forEach(([row, column]) => {
      if (graph[row][column] === 0) pressEmpty(graph, currentGraph, row, column);
      else if (graph[row][column] === 'mine') {
        pressMine(graph, currentGraph, row, column);
      } else currentGraph[row][column] = graph[row][column] as TNumber;
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const copy2DArray = (arr: any[][]): any[][] => {
  return arr.map((v) => v.slice());
};

export { pressMine, pressEmpty, pressRight, isSuccess, chagneGraphWhenSuccess, pressSync, copy2DArray };
