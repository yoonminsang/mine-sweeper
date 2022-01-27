import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { leftClickSaga, makeGraphSaga, rightClickSaga, syncClickSaga } from '@/saga/game';
import { TCurrentGraph, TGraph } from '@/types/game';
import { DIFFICULTY } from '@/constants';
import * as utils from '@/utils';

// graph
// mine, number, null

// currentGraph
// notSelect, mine, number, null, question

interface IMakeGraph {
  graph: TGraph;
  currentGraph: TCurrentGraph;
  mine: number;
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
  graph: utils.makeGraph(DIFFICULTY.beginner),
  currentGraph: utils.makeBasicGraph(row, column, 'notSelect'),
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
    makeGraph: (state) => state,
    makeGraphSuccess: (state, action: PayloadAction<IMakeGraph>) => {
      const { graph, currentGraph, mine } = action.payload;
      state = { ...initialState, graph, currentGraph, remainMine: mine };
    },
    leftClick: (state) => state,
    rightClick: (state) => state,
    syncClick: (state) => state,
    clickSuccess: (state, action: PayloadAction<TCurrentGraph>) => {
      state.currentGraph = action.payload;
    },
    startGame: (state) => {
      state.isProcess = true;
    },
    successGame: (state) => {
      state.isSuccess = true;
    },
    failGame: (state) => {
      state.isFail = true;
    },
    endGame: (state) => {
      state.isEnd = true;
      state.isProcess = false;
    },
  },
});

const { actions, reducer: gameReducer } = slice;
const {
  makeGraph,
  makeGraphSuccess,
  leftClick,
  rightClick,
  syncClick,
  clickSuccess,
  startGame,
  successGame,
  failGame,
  endGame,
} = actions;

function* gameSaga(): Generator {
  yield takeLatest(makeGraph.type, makeGraphSaga);
  yield takeLatest(leftClick.type, leftClickSaga);
  yield takeLatest(rightClick.type, rightClickSaga);
  yield takeLatest(syncClick.type, syncClickSaga);
}

export {
  gameReducer,
  makeGraph,
  makeGraphSuccess,
  leftClick,
  rightClick,
  syncClick,
  clickSuccess,
  startGame,
  successGame,
  failGame,
  endGame,
  gameSaga,
};
