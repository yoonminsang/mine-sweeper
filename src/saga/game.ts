import { PayloadAction } from '@reduxjs/toolkit';
import { put, select } from 'redux-saga/effects';
import * as gameStore from '@/store/game';
import { RootState } from '@/store';
import { IGameInitOption, ILocation } from '@/types/game';
import { makeBasicGraph, makeGraph } from '@/utils';

function* makeGraphSaga(action: PayloadAction<IGameInitOption>): Generator {
  const { mine, row, column } = action.payload;
  const graph = makeGraph({ mine, row, column });
  const currentGraph = makeBasicGraph(row, column, 'notSelect');
  yield put({ type: gameStore.makeGraphSuccess.type, payload: { mine, graph, currentGraph } });
}

function* leftClickSaga(action: PayloadAction<ILocation>): Generator {
  const {
    game: { graph, currentGraph },
  } = (yield select()) as RootState;
  const { row, column } = action.payload;
}

function* rightClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

function* syncClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

export { makeGraphSaga, leftClickSaga, rightClickSaga, syncClickSaga };
