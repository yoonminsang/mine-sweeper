import { DIFFICULTY } from '@/constants';
import { TGraph } from '@/types/game';
import { makeGraph } from './graph';

const checkMineNumber = (graph: TGraph) => {
  let mineNumber = 0;
  graph.forEach((graphRowArr) =>
    graphRowArr.forEach((graphColumnValue) => {
      if (graphColumnValue === 'mine') mineNumber += 1;
    }),
  );
  return mineNumber;
};

// 테스트 코드가 정확한지 확인하기 위해 utils의 함수를 사용하지 않고 새로 작성
const calcAroundMine = (graph: TGraph, graphRow: number, graphColumn: number): number | null => {
  let aroundMine = 0;
  for (let i = graphRow - 1; i <= graphRow + 1; i++) {
    for (let j = graphColumn - 1; j <= graphColumn + 1; j++) {
      if (graph[i][j] === 'mine') aroundMine += 1;
    }
  }
  if (aroundMine === 0) return null;
  return aroundMine;
};

describe('util', () => {
  it('check the number of mines in the beginner graph ', () => {
    const graph = makeGraph(DIFFICULTY.beginner);
    const mineNumber = checkMineNumber(graph);
    expect(mineNumber).toBe(10);
  });

  it('check the number of mines in the intermediate graph ', () => {
    const graph = makeGraph(DIFFICULTY.intermediate);
    const mineNumber = checkMineNumber(graph);
    expect(mineNumber).toBe(40);
  });

  it('check the number of mines in the expert graph ', () => {
    const graph = makeGraph(DIFFICULTY.expert);
    const mineNumber = checkMineNumber(graph);
    expect(mineNumber).toBe(99);
  });

  it('check the number of mines near the beginner graph', () => {
    const graph = makeGraph(DIFFICULTY.beginner);
    for (let i = 1; i < DIFFICULTY.beginner.row - 1; i++) {
      for (let j = 1; j < DIFFICULTY.beginner.column - 1; j++) {
        if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
      }
    }
  });

  it('check the number of mines near the intermediate graph', () => {
    const graph = makeGraph(DIFFICULTY.intermediate);
    for (let i = 1; i < DIFFICULTY.intermediate.row - 1; i++) {
      for (let j = 1; j < DIFFICULTY.intermediate.column - 1; j++) {
        if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
      }
    }
  });

  it('check the number of mines near the expert graph', () => {
    const graph = makeGraph(DIFFICULTY.expert);
    for (let i = 1; i < DIFFICULTY.expert.row - 1; i++) {
      for (let j = 1; j < DIFFICULTY.expert.column - 1; j++) {
        if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
      }
    }
  });
});
