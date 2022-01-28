/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import GameGraphCommon from './game-graph-common';

interface IProps {
  index: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameGraphCenter: React.FC<IProps> = ({ index }) => {
  return (
    <Row>
      <img src="http://freeminesweeper.org/images/borderjointl.gif" alt="img" />
      <GameGraphCommon index={index} />
      <img src="http://freeminesweeper.org/images/borderjointr.gif" alt="img" />
    </Row>
  );
};

export default React.memo(GameGraphCenter);
