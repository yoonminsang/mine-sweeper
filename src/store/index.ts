import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { gameReducer, gameSaga } from './game';

const rootReducer = combineReducers({
  game: gameReducer,
});

type RootState = ReturnType<typeof rootReducer>;

function* rootSaga(): Generator {
  try {
    yield all([gameSaga()]);
  } catch (err) {
    console.log(err);
  }
}

export { rootReducer, RootState, rootSaga };
