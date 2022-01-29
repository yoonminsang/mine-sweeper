import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import * as menuStore from '@/store/menu';
import { IDifficulty } from '@/types/game';
import { initGameSaga } from './game';

function* changeDifficultySaga(action: PayloadAction<IDifficulty>): Generator {
  const { difficulty, mine, row, column } = action.payload;
  yield put({ type: menuStore.changeDifficultySuccess.type, payload: { difficulty, mine, row, column } });

  yield call(initGameSaga);
}

export { changeDifficultySaga };
