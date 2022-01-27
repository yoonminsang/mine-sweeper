import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';
import GameContent from './game-content';
import GameHeader from './game-header';

interface IProps {
  currentGraph: TCurrentGraph;
}

const Wrapper = styled.div``;

const Game: React.FC<IProps> = ({ currentGraph }) => {
  return (
    <Wrapper>
      <GameHeader />
      <GameContent currentGraph={currentGraph} />
    </Wrapper>
  );
};

export default Game;
