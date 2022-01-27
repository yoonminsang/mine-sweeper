/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';
import GameCell from './game-cell';

interface IProps {
  currentGraph: TCurrentGraph;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameContent: React.FC<IProps> = ({ currentGraph }) => {
  return (
    <Wrapper>
      {currentGraph.map((currentGraphRow, i) => {
        return (
          <Row key={i}>
            {currentGraphRow.map((currentGraphCell, j) => {
              return <GameCell key={j} currentGraphCell={currentGraphCell} />;
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default GameContent;
