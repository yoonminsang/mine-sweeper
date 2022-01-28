import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import * as menuStore from '@/store/menu';
import * as gameStore from '@/store/game';
import { IDifficulty } from '@/types/game';
import { makeBasicGraph, makeGraph } from '@/utils';

function* changeDifficultySaga(action: PayloadAction<IDifficulty>): Generator {
  const { difficulty, mine, row, column } = action.payload;
  yield put({ type: menuStore.changeDifficultySuccess.type, payload: { difficulty, mine, row, column } });

  const graph = makeGraph({ mine, row, column });
  const currentGraph = makeBasicGraph(row, column, 'notSelect');
  yield put({ type: gameStore.initGameSuccess.type, payload: { mine, graph, currentGraph } });
}

export { changeDifficultySaga };
