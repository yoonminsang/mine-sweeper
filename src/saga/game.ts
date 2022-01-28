import { PayloadAction } from '@reduxjs/toolkit';
import { put, select } from 'redux-saga/effects';
import * as gameStore from '@/store/game';
import { RootState } from '@/store';
import { ILocation, TCurrentGraph, TGraph } from '@/types/game';
import { makeBasicGraph, makeGraph } from '@/utils';

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

function* initGraphSaga(): Generator {
  const {
    menu: { mine, row, column },
  } = (yield select()) as RootState;
  const graph = makeGraph({ mine, row, column });
  const currentGraph = makeBasicGraph(row, column, 'notSelect');
  yield put({ type: gameStore.initGraphSuccess.type, payload: { mine, graph, currentGraph } });
}

function* leftClickSaga(action: PayloadAction<ILocation>): Generator {
  const {
    game: { graph, currentGraph, isProcess, isEnd },
  } = (yield select()) as RootState;

  if (isEnd) return;
  if (!isProcess) yield put({ type: gameStore.startGame.type });

  const { row, column } = action.payload;
  const nextCurrentGraph = currentGraph.map((v) => v.slice()); // 2차원 배열 복사
  if (nextCurrentGraph[row][column] !== 'notSelect') return;

  const graphCell = graph[row][column];
  switch (graphCell) {
    case 'mine':
      pressMine(graph, nextCurrentGraph, row, column);
      yield put({ type: gameStore.failGame.type });
      break;
    case 0: {
      pressEmpty(graph, nextCurrentGraph, row, column);
      break;
    }
    default:
      nextCurrentGraph[row][column] = graphCell;
  }
  yield put({ type: gameStore.clickSuccess.type, payload: nextCurrentGraph });
}

function* rightClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

function* syncClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

export { initGraphSaga, leftClickSaga, rightClickSaga, syncClickSaga };
