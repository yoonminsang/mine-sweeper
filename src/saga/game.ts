import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import * as gameStore from '@/store/game';
import { IGameInitOption, ILocation } from '@/types/game';
import { makeGraph } from '@/utils';

function* makeGraphSaga(action: PayloadAction<IGameInitOption>): Generator {
  const graph = makeGraph(action.payload);
  yield put({ type: gameStore.makeGraphSuccess.type, payload: graph });
}

function* leftClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

function* rightClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

function* syncClickSaga(action: PayloadAction<ILocation>): Generator {
  // TODO
}

export { makeGraphSaga, leftClickSaga, rightClickSaga, syncClickSaga };
