import { TGraph } from '@/types/game';
import { pressMine, pressEmpty, isSuccess, chagneGraphWhenSuccess, pressSync, copy2DArray } from './game';
import { makeBasicGraph } from './graph';

const getGraph = (): TGraph => {
  const graph: TGraph = [
    ['mine', 'mine', 1, 0, 0, 0, 0, 0],
    [2, 3, 2, 1, 0, 0, 0, 0],
    [1, 2, 'mine', 1, 0, 0, 0, 0],
    ['mine', 3, 3, 3, 2, 1, 0, 0],
    [2, 'mine', 3, 'mine', 'mine', 1, 0, 0],
    [1, 1, 3, 'mine', 3, 1, 0, 0],
    [0, 1, 2, 2, 2, 1, 1, 0],
    [0, 1, 'mine', 1, 1, 'mine', 1, 0],
  ];
  const copyGraph: TGraph = copy2DArray(graph);
  return copyGraph;
};

describe('game util', () => {
  it('press mine first', () => {
    const graph = getGraph();
    const [row, column] = [graph.length, graph[0].length];
    const currentGraph = makeBasicGraph(row, column, 'notSelect');
    const [pressRow, pressColumn] = [0, 0];
    pressMine(graph, currentGraph, pressRow, pressColumn);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        const [graphValue, currentGraphValue] = [graph[i][j], currentGraph[i][j]];
        if (i === pressRow && j === pressColumn) {
          expect(currentGraphValue).toBe('bombDeath');
        } else if (graphValue === 'mine') {
          expect(currentGraphValue).toBe('bombRevealed');
        }
      }
    }
  });

  it('press mine when flags are mine', () => {});
  it('press mine when flags are not mine ', () => {});
  it('press mine when some flags are mine and some are not mine', () => {});

  it('press empty', () => {});
  it('is success?', () => {});
  it('chagne graph when success', () => {});
  it('press sync', () => {});
  it('press sync and press empty', () => {});

  // it('press mine first(intermediate)', () => {
  //   const { row, column } = DIFFICULTY.intermediate;
  //   const graph = makeGraph(DIFFICULTY.intermediate);
  //   const currentGraph = makeBasicGraph(row, column, 'notSelect');
  //   const [pressRow, pressColumn] = pressMineFirst(graph, currentGraph, row, column);
  //   for (let i = 0; i < row; i++) {
  //     for (let j = 0; j < column; j++) {
  //       const [graphValue, currentGraphValue] = [graph[i][j], currentGraph[i][j]];
  //       if (i === pressRow && j === pressColumn) {
  //         expect(currentGraphValue).toBe('bombDeath');
  //       } else if (graphValue === 'mine') {
  //         expect(currentGraphValue).toBe('bombRevealed');
  //       }
  //     }
  //   }
  // });

  // it('press mine first(expert)', () => {
  //   const { row, column } = DIFFICULTY.expert;
  //   const graph = makeGraph(DIFFICULTY.expert);
  //   const currentGraph = makeBasicGraph(row, column, 'notSelect');
  //   const [pressRow, pressColumn] = pressMineFirst(graph, currentGraph, row, column);
  //   for (let i = 0; i < row; i++) {
  //     for (let j = 0; j < column; j++) {
  //       const [graphValue, currentGraphValue] = [graph[i][j], currentGraph[i][j]];
  //       if (i === pressRow && j === pressColumn) {
  //         expect(currentGraphValue).toBe('bombDeath');
  //       } else if (graphValue === 'mine') {
  //         expect(currentGraphValue).toBe('bombRevealed');
  //       }
  //     }
  //   }
  // });

  // it('check the number of mines in the intermediate graph ', () => {
  //   const graph = makeGraph(DIFFICULTY.intermediate);
  //   const mineNumber = checkMineNumber(graph);
  //   expect(mineNumber).toBe(DIFFICULTY.intermediate.mine);
  // });

  // it('check the number of mines in the expert graph ', () => {
  //   const graph = makeGraph(DIFFICULTY.expert);
  //   const mineNumber = checkMineNumber(graph);
  //   expect(mineNumber).toBe(DIFFICULTY.expert.mine);
  // });

  // it('check the number of mines near the beginner graph', () => {
  //   const graph = makeGraph(DIFFICULTY.beginner);
  //   for (let i = 1; i < DIFFICULTY.beginner.row - 1; i++) {
  //     for (let j = 1; j < DIFFICULTY.beginner.column - 1; j++) {
  //       if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
  //     }
  //   }
  // });

  // it('check the number of mines near the intermediate graph', () => {
  //   const graph = makeGraph(DIFFICULTY.intermediate);
  //   for (let i = 1; i < DIFFICULTY.intermediate.row - 1; i++) {
  //     for (let j = 1; j < DIFFICULTY.intermediate.column - 1; j++) {
  //       if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
  //     }
  //   }
  // });

  // it('check the number of mines near the expert graph', () => {
  //   const graph = makeGraph(DIFFICULTY.expert);
  //   for (let i = 1; i < DIFFICULTY.expert.row - 1; i++) {
  //     for (let j = 1; j < DIFFICULTY.expert.column - 1; j++) {
  //       if (graph[i][j] !== 'mine') expect(graph[i][j]).toBe(calcAroundMine(graph, i, j));
  //     }
  //   }
  // });
});
