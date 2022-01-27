import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';
import GameContent from './game-content';
import GameHeader from './game-header';

interface IProps {
  currentGraph: TCurrentGraph;
  onMouseDown: (e: React.MouseEvent, row: number, column: number) => void;
  onMouseUp: (e: React.MouseEvent, row: number, column: number) => void;
}

const Wrapper = styled.div``;

const Game: React.FC<IProps> = ({ currentGraph, onMouseUp, onMouseDown }) => {
  return (
    <Wrapper>
      <GameHeader index={currentGraph[0].length} />
      <GameContent currentGraph={currentGraph} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
    </Wrapper>
  );
};

export default Game;
