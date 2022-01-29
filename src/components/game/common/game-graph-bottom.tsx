/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import GameGraphCommon from './game-graph-common';
import borderbl from '@/assets/images/borderbl.gif';
import borderbr from '@/assets/images/borderbr.gif';

interface IProps {
  index: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameGraphBottom: React.FC<IProps> = ({ index }) => {
  return (
    <Row>
      <img src={borderbl} alt="borderbl" />
      <GameGraphCommon index={index} />
      <img src={borderbr} alt="borderbr" />
    </Row>
  );
};

export default React.memo(GameGraphBottom);
