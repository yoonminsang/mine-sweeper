/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import GameGraphCommon from './game-graph-common';
import bordertl from '@/assets/images/bordertl.gif';
import bordertr from '@/assets/images/bordertr.gif';

interface IProps {
  index: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameGraphTop: React.FC<IProps> = ({ index }) => {
  return (
    <Row>
      <img src={bordertl} alt="bordertl" />
      <GameGraphCommon index={index} />
      <img src={bordertr} alt="bordertr" />
    </Row>
  );
};

export default React.memo(GameGraphTop);
