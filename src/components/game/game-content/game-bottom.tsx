/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';

interface IProps {
  currentGraph: TCurrentGraph;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameBottom: React.FC<IProps> = ({ currentGraph }) => {
  return (
    <Row>
      <img src="http://freeminesweeper.org/images/borderbl.gif" alt="img" />
      {currentGraph[0].map((_, i) => {
        return <img key={i} src="http://freeminesweeper.org/images/bordertb.gif" alt="img" width={16} height={10} />;
      })}
      <img src="http://freeminesweeper.org/images/borderbr.gif" alt="img" />
    </Row>
  );
};

export default GameBottom;
