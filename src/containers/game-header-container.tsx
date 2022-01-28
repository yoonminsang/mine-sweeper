import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import GameHeader from '@/components/game/game-header';
import { initGame } from '@/store/game';

const GameHeaderContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { index, remainMine, timer, isSuccess, isFail } = useSelector(({ game }: RootState) => ({
    index: game.currentGraph[0].length,
    remainMine: game.remainMine,
    timer: game.timer,
    isSuccess: game.isSuccess,
    isFail: game.isFail,
  }));

  const initGameHandler = useCallback(() => {
    dispatch({ type: initGame.type });
  }, [dispatch]);

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
