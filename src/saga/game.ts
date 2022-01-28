import { PayloadAction } from '@reduxjs/toolkit';
import { put, select } from 'redux-saga/effects';
import * as gameStore from '@/store/game';
import { RootState } from '@/store';
import { ILocation } from '@/types/game';
import { makeBasicGraph, makeGraph } from '@/utils/graph';
import { isSuccess, pressEmpty, pressMine } from '@/utils/game';

function* initGameSaga(): Generator {
  const {
    menu: { mine, row, column },
  } = (yield select()) as RootState;
  const graph = makeGraph({ mine, row, column });
  const currentGraph = makeBasicGraph(row, column, 'notSelect');
  yield put({ type: gameStore.initGameSuccess.type, payload: { mine, graph, currentGraph } });
}

function* leftClickSaga(action: PayloadAction<ILocation>): Generator {
  const {
    game: { graph, currentGraph, isProcess, isEnd, remainMine },
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

  if (isSuccess(nextCurrentGraph, remainMine)) yield put({ type: gameStore.successGame.type });
  yield put({ type: gameStore.clickSuccess.type, payload: nextCurrentGraph });
}

function* rightClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

function* syncClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

export { initGameSaga, leftClickSaga, rightClickSaga, syncClickSaga };
