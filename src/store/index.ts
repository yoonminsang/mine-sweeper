import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { gameReducer, gameSaga } from './game';
import { menuReducer, menuSaga } from './menu';

const rootReducer = combineReducers({
  game: gameReducer,
  menu: menuReducer,
});

type RootState = ReturnType<typeof rootReducer>;

function* rootSaga(): Generator {
  try {
    yield all([gameSaga(), menuSaga()]);
  } catch (err) {
    console.log(err);
  }
}

export { rootReducer, RootState, rootSaga };
