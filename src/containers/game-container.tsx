import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '@/components/game';
import { RootState } from '@/store';
import { leftClick, rightClick, syncClick } from '@/store/game';

const GameContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentGraph, remainMine, timer, timerId, isProcess, isSuccess, isFail, isEnd } = useSelector(
    ({ game }: RootState) => ({
      currentGraph: game.currentGraph,
      remainMine: game.remainMine,
      timer: game.timer,
      timerId: game.timerId,
      isProcess: game.isProcess,
      isSuccess: game.isSuccess,
      isFail: game.isFail,
      isEnd: game.isEnd,
    }),
  );

  const onClickLeftHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: leftClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  const onClickRightHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: rightClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  const onClickSyncHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: syncClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  return <Game currentGraph={currentGraph} />;
};

export default GameContainer;
