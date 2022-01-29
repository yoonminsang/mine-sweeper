/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import GameGraphCommon from './game-graph-common';
import borderjointl from '@/assets/images/borderjointl.gif';
import borderjointr from '@/assets/images/borderjointr.gif';

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
      <img src={borderjointl} alt="borderjointl" />
      <GameGraphCommon index={index} />
      <img src={borderjointr} alt="borderjointr" />
    </Row>
  );
};

export default React.memo(GameGraphCenter);
