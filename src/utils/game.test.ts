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
});
