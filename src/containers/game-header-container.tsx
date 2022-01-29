import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import GameHeader from '@/components/game/game-header';
import { initGame, plusTime } from '@/store/game';

const GameHeaderContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { index, remainMine, timer, isSuccess, isFail, isProcess } = useSelector(({ game }: RootState) => ({
    index: game.currentGraph[0].length,
    remainMine: game.remainMine,
    timer: game.timer,
    isSuccess: game.isSuccess,
    isFail: game.isFail,
    isProcess: game.isProcess,
  }));

  const initGameHandler = useCallback(() => {
    dispatch({ type: initGame.type });
  }, [dispatch]);

  const timerId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isProcess) {
      timerId.current = setInterval(() => {
        dispatch({ type: plusTime.type });
      }, 1000);
    } else if (timerId.current) clearInterval(timerId.current);
  }, [dispatch, isProcess]);

  return (
    <GameHeader
      index={index}
      remainMine={remainMine}
      timer={timer}
      isSuccess={isSuccess}
      isFail={isFail}
      initGameHandler={initGameHandler}
    />
  );
};

export default GameHeaderContainer;
