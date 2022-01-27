import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { IDifficulty as StateProps } from '@/types/game';
import { DIFFICULTY } from '@/constants';
import { changeDifficultySaga } from '@/saga/menu';

const { mine, row, column } = DIFFICULTY.beginner;

const initialState: StateProps = {
  difficulty: 'beginner',
  mine,
  row,
  column,
};

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeDifficulty: (state) => state,
    changeDifficultySuccess: (state, action: PayloadAction<StateProps>) => {
      state = action.payload;
    },
  },
});

const { actions, reducer: menuReducer } = slice;
const { changeDifficulty, changeDifficultySuccess } = actions;

function* menuSaga(): Generator {
  yield takeLatest(changeDifficulty.type, changeDifficultySaga);
}

export { menuReducer, changeDifficulty, changeDifficultySuccess, menuSaga };
