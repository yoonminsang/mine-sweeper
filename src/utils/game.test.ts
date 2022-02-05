import { TCurrentGraph, TGraph, TNumber } from '@/types/game';
import { pressMine, pressEmpty, pressRight, isSuccess, chagneGraphWhenSuccess, pressSync, copy2DArray } from './game';
import { makeBasicGraph } from './graph';

let graph: TGraph = [];
let currentGraph: TCurrentGraph = [];
let [row, column]: number[] = [];
let remainMine = 0;
let emptyClickArr: number[][] = [];

describe('game util', () => {
  beforeEach(() => {
    graph = [
      ['mine', 'mine', 1, 0, 0, 0, 0, 0],
      [2, 3, 2, 1, 0, 0, 0, 0],
      [1, 2, 'mine', 1, 0, 0, 0, 0],
      ['mine', 3, 3, 3, 2, 1, 0, 0],
      [2, 'mine', 3, 'mine', 'mine', 1, 0, 0],
      [1, 1, 3, 'mine', 3, 1, 0, 0],
      [0, 1, 2, 2, 2, 1, 1, 0],
      [0, 1, 'mine', 1, 1, 'mine', 1, 0],
    ];
    currentGraph = makeBasicGraph(8, 8, 'notSelect');
    [row, column] = [8, 8];
    remainMine = 10;
    emptyClickArr = [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 6],
      [7, 7],
    ];
  });

  describe('right click', () => {
    it('right click once', () => {
      remainMine = pressRight(currentGraph, remainMine, 0, 0);
      expect(currentGraph[0][0]).toBe('flag');
      expect(remainMine).toBe(9);
    });
    it('right click twice', () => {
      remainMine = pressRight(currentGraph, remainMine, 0, 0);
      remainMine = pressRight(currentGraph, remainMine, 0, 0);
      expect(currentGraph[0][0]).toBe('question');
      expect(remainMine).toBe(10);
    });
    it('right click three times', () => {
      remainMine = pressRight(currentGraph, remainMine, 0, 0);
      remainMine = pressRight(currentGraph, remainMine, 0, 0);
      pressRight(currentGraph, 10, 0, 0);
      expect(currentGraph[0][0]).toBe('notSelect');
      expect(remainMine).toBe(10);
    });
  });

  describe('press mine', () => {
    it('press mine', () => {
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
    it('press mine when press number', () => {
      currentGraph[1][0] = graph[1][0] as TNumber;
      pressRight(currentGraph, remainMine, 0, 0);
      pressMine(graph, currentGraph, 0, 1);
      expect(currentGraph[1][0]).toBe(graph[1][0]);
    });
    it('press mine when flags are mine', () => {
      pressRight(currentGraph, remainMine, 0, 0);
      pressMine(graph, currentGraph, 0, 1);
      expect(currentGraph[0][0]).toBe('flag');
    });
    it('press mine when flags are not mine ', () => {
      pressRight(currentGraph, remainMine, 1, 0);
      pressMine(graph, currentGraph, 0, 1);
      expect(currentGraph[1][0]).toBe('bombmIsFlagged');
    });
  });

  it('check remainMine', () => {
    remainMine = pressRight(currentGraph, remainMine, 0, 0);
    remainMine = pressRight(currentGraph, remainMine, 0, 1);
    remainMine = pressRight(currentGraph, remainMine, 0, 2);
    expect(remainMine).toBe(7);
  });

  it('press empty', () => {
    pressEmpty(graph, currentGraph, 0, 3);
    emptyClickArr.forEach(([row, column]) => {
      expect(currentGraph[row][column]).not.toBe('notSelect');
    });
  });

  it('not success', () => {
    expect(isSuccess(currentGraph, remainMine)).toBeFalsy();
  });

  it('success', () => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (graph[i][j] !== 'mine') currentGraph[i][j] = graph[i][j] as TNumber;
      }
    }
    expect(isSuccess(currentGraph, remainMine)).toBeTruthy();
  });

  it('chagne graph when success(remain mine)', () => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (graph[i][j] !== 'mine') currentGraph[i][j] = graph[i][j] as TNumber;
      }
    }
    chagneGraphWhenSuccess(graph, currentGraph);
    currentGraph.forEach((currentGraphRow) => {
      currentGraphRow.forEach((cell) => {
        expect(cell).not.toBe('notSelect');
      });
    });
  });

  it('chagne graph when success(remain notSelect)', () => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (i === 1 && j === 0) continue;
        if (graph[i][j] !== 'mine') currentGraph[i][j] = graph[i][j] as TNumber;
        else remainMine = pressRight(currentGraph, remainMine, i, j);
      }
    }
    chagneGraphWhenSuccess(graph, currentGraph);
    currentGraph.forEach((currentGraphRow) => {
      currentGraphRow.forEach((cell) => {
        expect(cell).not.toBe('notSelect');
      });
    });
  });

  it('press sync', () => {
    pressRight(currentGraph, remainMine, 0, 1);
    currentGraph[0][2] = graph[0][2] as TNumber;
    pressSync(graph, currentGraph, 0, 2);
    expect(currentGraph[0][3]).not.toBe('notSelect');
    expect(currentGraph[1][1]).not.toBe('notSelect');
    expect(currentGraph[1][2]).not.toBe('notSelect');
    expect(currentGraph[1][3]).not.toBe('notSelect');
    expect(currentGraph[1][3]).not.toBe('notSelect');
  });

  it('press sync and press empty', () => {
    pressRight(currentGraph, remainMine, 0, 1);
    currentGraph[0][2] = graph[0][2] as TNumber;
    pressSync(graph, currentGraph, 0, 2);
    emptyClickArr.forEach(([row, column]) => {
      expect(currentGraph[row][column]).not.toBe('notSelect');
    });
  });

  it('press sync not working', () => {
    const copyCurrentGraph = copy2DArray(currentGraph);
    pressSync(graph, copyCurrentGraph, 0, 2);
    expect(copyCurrentGraph).toEqual(currentGraph);
  });

  it('2d copy', () => {
    const copy = copy2DArray(graph);
    copy[0][0] = 'change';
    expect(copy).not.toEqual(graph);
  });
});
