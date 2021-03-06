import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select } from 'redux-saga/effects';
import * as gameStore from '@/store/game';
import { RootState } from '@/store';
import { ILocation, TCurrentGraph, TGraph } from '@/types/game';
import { makeBasicGraph, makeGraph } from '@/utils/graph';
import {
  chagneGraphWhenSuccess,
  pressSync,
  copy2DArray,
  isSuccess,
  pressEmpty,
  pressMine,
  pressRight,
} from '@/utils/game';

function* successSaga(graph: TGraph, nextCurrentGraph: TCurrentGraph, remainMine: number): Generator {
  if (isSuccess(nextCurrentGraph, remainMine)) {
    chagneGraphWhenSuccess(graph, nextCurrentGraph);
    yield put({ type: gameStore.successGame.type });
  }
}

function* initGameSaga(): Generator {
  const {
    menu: { mine, row, column },
  } = (yield select()) as RootState;
  const graph = makeGraph({ mine, row, column });
  const currentGraph = makeBasicGraph(row, column, 'notSelect');
  yield put({ type: gameStore.initGameSuccess.type, payload: { mine, graph, currentGraph } });
}

function* leftClickSagaHelper(graph: TGraph, nextCurrentGraph: TCurrentGraph, row: number, column: number): Generator {
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
}

function* leftClickSaga(action: PayloadAction<ILocation>): Generator {
  const {
    game: { graph, currentGraph, isProcess, isEnd, remainMine },
  } = (yield select()) as RootState;
  const { row, column } = action.payload;

  if (isEnd || currentGraph[row][column] !== 'notSelect') return;

  const nextCurrentGraph = copy2DArray(currentGraph);

  yield call(leftClickSagaHelper, graph, nextCurrentGraph, row, column);
  yield call(successSaga, graph, nextCurrentGraph, remainMine);
  yield put({ type: gameStore.clickSuccess.type, payload: { currentGraph: nextCurrentGraph } });

  if (!isProcess) {
    yield put({ type: gameStore.startGame.type });
  }
}

function* rightClickSaga(action: PayloadAction<ILocation>): Generator {
  const { game } = (yield select()) as RootState;
  const { graph, currentGraph, isEnd } = game;
  let { remainMine } = game;
  const { row, column } = action.payload;

  if (isEnd) return;

  const nextCurrentGraph = copy2DArray(currentGraph);

  remainMine = pressRight(nextCurrentGraph, remainMine, row, column);
  yield call(successSaga, graph, nextCurrentGraph, remainMine);
  yield put({
    type: gameStore.clickSuccess.type,
    payload: { currentGraph: nextCurrentGraph, remainMine },
  });
}

function* syncClickSaga(action: PayloadAction<ILocation>): Generator {
  const {
    game: { graph, currentGraph, isEnd, remainMine },
  } = (yield select()) as RootState;
  if (isEnd) return;

  const { row, column } = action.payload;
  const nextCurrentGraph = copy2DArray(currentGraph);
  const isPressMine = pressSync(graph, nextCurrentGraph, row, column);
  if (isPressMine) yield put({ type: gameStore.failGame.type });

  yield call(successSaga, graph, nextCurrentGraph, remainMine);
  yield put({
    type: gameStore.clickSuccess.type,
    payload: { currentGraph: nextCurrentGraph },
  });
}

export { initGameSaga, leftClickSaga, rightClickSaga, syncClickSaga };
