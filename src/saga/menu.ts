import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import * as menuStore from '@/store/menu';
import { IDifficulty } from '@/types/game';
import { DIFFICULTY } from '@/constants';

function* changeDifficultySaga(action: PayloadAction<IDifficulty>): Generator {
  const { difficulty } = action.payload;
  let { mine, row, column } = action.payload;
  switch (difficulty) {
    case 'beginner':
      [mine, row, column] = [DIFFICULTY.beginner.mine, DIFFICULTY.beginner.row, DIFFICULTY.beginner.column];
      break;
    case 'intermediate':
      [mine, row, column] = [DIFFICULTY.intermediate.mine, DIFFICULTY.intermediate.row, DIFFICULTY.intermediate.column];
      break;
    case 'expert':
      [mine, row, column] = [DIFFICULTY.expert.mine, DIFFICULTY.expert.row, DIFFICULTY.expert.column];
      break;
    default:
      break;
  }

  yield put({ type: menuStore.changeDifficultySuccess.type, payload: { difficulty, mine, row, column } });
}

export { changeDifficultySaga };
