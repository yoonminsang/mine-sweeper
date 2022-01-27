import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { initGraphSaga, leftClickSaga, rightClickSaga, syncClickSaga } from '@/saga/game';
import { TCurrentGraph, TGraph } from '@/types/game';
import { DIFFICULTY } from '@/constants';
import { makeBasicGraph, makeGraph } from '@/utils';

// graph
// 'mine' | number;

// currentGraph
// 'notSelect' | 'bombDeath' | 'bombRevealed' | 'bombmIsFlagged' | number | 'flag' | 'question';

interface IInitGraph {
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
    initGraph: (state) => state,
    initGraphSuccess: (state, action: PayloadAction<IInitGraph>) => {
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
      state.isEnd = true;
      state.isProcess = false;
    },
    failGame: (state) => {
      state.isFail = true;
      state.isEnd = true;
      state.isProcess = false;
    },
  },
});

const { actions, reducer: gameReducer } = slice;
const {
  initGraph,
  initGraphSuccess,
  leftClick,
  rightClick,
  syncClick,
  clickSuccess,
  startGame,
  successGame,
  failGame,
} = actions;

function* gameSaga(): Generator {
  yield takeLatest(initGraph.type, initGraphSaga);
  yield takeLatest(leftClick.type, leftClickSaga);
  yield takeLatest(rightClick.type, rightClickSaga);
  yield takeLatest(syncClick.type, syncClickSaga);
}

export {
  gameReducer,
  initGraph,
  initGraphSuccess,
  leftClick,
  rightClick,
  syncClick,
  clickSuccess,
  startGame,
  successGame,
  failGame,
  gameSaga,
};
