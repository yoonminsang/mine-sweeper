/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';
import GameCell from './game-cell';
import GameTop from './game-top';
import GameBottom from './game-bottom';

interface IProps {
  currentGraph: TCurrentGraph;
  onMouseDown: (e: React.MouseEvent, row: number, column: number) => void;
  onMouseUp: (e: React.MouseEvent, row: number, column: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameContent: React.FC<IProps> = ({ currentGraph, onMouseDown, onMouseUp }) => {
  return (
    <Wrapper>
      <GameTop currentGraph={currentGraph} />
      {currentGraph.map((currentGraphRow, i) => {
        return (
          <Row key={i}>
            <img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" />
            {currentGraphRow.map((currentGraphCell, j) => {
              return (
                <GameCell
                  key={j}
                  currentGraphCell={currentGraphCell}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  row={i}
                  column={j}
                />
              );
            })}
            <img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" />
          </Row>
        );
      })}
      <GameBottom currentGraph={currentGraph} />
    </Wrapper>
  );
};

export default GameContent;
