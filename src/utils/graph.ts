import { IGameInitOption, TGraph } from '@/types/game';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeBasicGraph = (row: number, column: number, value: 0 | 'notSelect'): any[][] => {
  const graph = Array(row)
    .fill(null)
    .map(() => Array(column).fill(value));
  return graph;
};

const make1DMineArr = (row: number, column: number, mine: number): number[] => {
  const mineArr: number[] = [];
  for (let i = 0; i < mine; i++) {
    const randomNumber = Math.floor(Math.random() * row * column);
    if (!mineArr.includes(randomNumber)) {
      mineArr.push(randomNumber);
    } else {
      i--;
    }
  }
  return mineArr;
};

const make2DMineArr = (row: number, column: number, preMineArr: number[]): number[][] => {
  const mineArr: number[][] = preMineArr.map((mine) => {
    const mineRow = Math.floor(mine / column);
    const mineColumn = mine % column;
    return [mineRow, mineColumn];
  });
  return mineArr;
};

const makeMineArr = (row: number, column: number, mine: number): number[][] => {
  const preMineArr = make1DMineArr(row, column, mine);
  const mineArr = make2DMineArr(row, column, preMineArr);
  return mineArr;
};

const calcAroundMine = (row: number, column: number, graph: TGraph, graphRow: number, graphColumn: number): number => {
  let aroundMine = 0;
  for (let i = Math.max(0, graphRow - 1); i <= Math.min(row - 1, graphRow + 1); i++) {
    for (let j = Math.max(0, graphColumn - 1); j <= Math.min(column - 1, graphColumn + 1); j++) {
      if (graph[i][j] === 'mine') aroundMine += 1;
    }
  }
  return aroundMine;
};

const makeGraph = (option: IGameInitOption): TGraph => {
  const { row, column, mine } = option;

  const graph: TGraph = makeBasicGraph(row, column, 0);
  const mineArr = makeMineArr(row, column, mine);
  mineArr.forEach(([mineRow, mineColumn]) => {
    graph[mineRow][mineColumn] = 'mine';
  });

  const calcGraph = graph.map((graphRowArr, graphRow) =>
    graphRowArr.map((graphColumnValue, graphColumn) => {
      if (graphColumnValue === 'mine') return graphColumnValue;
      return calcAroundMine(row, column, graph, graphRow, graphColumn);
    }),
  );
  return calcGraph as TGraph;
};

export { makeBasicGraph, makeGraph };
