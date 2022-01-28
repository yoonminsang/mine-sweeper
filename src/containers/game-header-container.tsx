import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import GameHeader from '@/components/game/game-header';

const GameHeaderContainer: React.FC = () => {
  const { index, remainMine, timer, isSuccess, isFail } = useSelector(({ game }: RootState) => ({
    index: game.currentGraph[0].length,
    remainMine: game.remainMine,
    timer: game.timer,
    isSuccess: game.isSuccess,
    isFail: game.isFail,
  }));

  return <GameHeader index={index} remainMine={remainMine} timer={timer} isSuccess={isSuccess} isFail={isFail} />;
};

export default GameHeaderContainer;
