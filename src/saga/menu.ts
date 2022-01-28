import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import * as menuStore from '@/store/menu';
import { IDifficulty } from '@/types/game';
// import * as gameStore from '@/store/game';
// import { makeBasicGraph, makeGraph } from '@/utils/graph';
import { initGameSaga } from './game';

function* changeDifficultySaga(action: PayloadAction<IDifficulty>): Generator {
  const { difficulty, mine, row, column } = action.payload;
  // TODO: DIFFICULTY에 따라 mine, row, coloumn값 받기??
  yield put({ type: menuStore.changeDifficultySuccess.type, payload: { difficulty, mine, row, column } });

  yield call(initGameSaga);
  // TODO
  // const graph = makeGraph({ mine, row, column });
  // const currentGraph = makeBasicGraph(row, column, 'notSelect');
  // yield put({ type: gameStore.initGameSuccess.type, payload: { mine, graph, currentGraph } });
}

export { changeDifficultySaga };
