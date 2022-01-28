import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { initGameSaga, leftClickSaga, rightClickSaga, syncClickSaga } from '@/saga/game';
import { TCurrentGraph, TGraph } from '@/types/game';
import { DIFFICULTY } from '@/constants';
import { makeBasicGraph, makeGraph } from '@/utils/graph';

// graph
// 'mine' | number;

// currentGraph
// 'notSelect' | 'bombDeath' | 'bombRevealed' | 'bombmIsFlagged' | number | 'flag' | 'question';

interface IInitGame {
  graph: TGraph;
  currentGraph: TCurrentGraph;
  mine: number;
}

interface IClickSuccess {
  currentGraph: TCurrentGraph;
  remainMine?: number;
}

interface StateProps {
  graph: TGraph;
  currentGraph: TCurrentGraph;
  remainMine: number;
  timer: number;
  timerId: number;
  isProcess: boolean;
  isSuccess: boolean;
  isFail: boolean;
  isEnd: boolean;
}

const { row, column, mine } = DIFFICULTY.beginner;

const initialState: StateProps = {
  graph: makeGraph(DIFFICULTY.beginner),
  currentGraph: makeBasicGraph(row, column, 'notSelect'),
  remainMine: mine,
  timer: 0,
  timerId: -1,
  isProcess: false,
  isSuccess: false,
  isFail: false,
  isEnd: false,
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame: (state) => state,
    initGameSuccess: (state, action: PayloadAction<IInitGame>) => {
      const { graph, currentGraph, mine } = action.payload;
      return { ...initialState, graph, currentGraph, remainMine: mine };
    },
    leftClick: (state) => state,
    rightClick: (state) => state,
    syncClick: (state) => state,
    clickSuccess: (state, action: PayloadAction<IClickSuccess>) => {
      const { currentGraph, remainMine } = action.payload;
      state.currentGraph = currentGraph;
      if (typeof remainMine === 'number') state.remainMine = remainMine;
    },
    startGame: (state) => {
      state.isProcess = true;
    },
    successGame: (state) => {
      state.isSuccess = true;
      state.isEnd = true;
      state.isProcess = false;
      state.remainMine = 0;
    },
    failGame: (state) => {
      state.isFail = true;
      state.isEnd = true;
      state.isProcess = false;
    },
  },
});

const { actions, reducer: gameReducer } = slice;
const { initGame, initGameSuccess, leftClick, rightClick, syncClick, clickSuccess, startGame, successGame, failGame } =
  actions;

function* gameSaga(): Generator {
  yield takeLatest(initGame.type, initGameSaga);
  yield takeLatest(leftClick.type, leftClickSaga);
  yield takeLatest(rightClick.type, rightClickSaga);
  yield takeLatest(syncClick.type, syncClickSaga);
}

export {
  gameReducer,
  initGame,
  initGameSuccess,
  leftClick,
  rightClick,
  syncClick,
  clickSuccess,
  startGame,
  successGame,
  failGame,
  gameSaga,
};
