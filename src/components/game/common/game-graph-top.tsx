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

const Img = styled.img`
  width: 10px;
  height: 10px;
`;

const GameGraphTop: React.FC<IProps> = ({ index }) => {
  return (
    <Row>
      <Img src={bordertl} alt="bordertl" />
      <GameGraphCommon index={index} />
      <Img src={bordertr} alt="bordertr" />
    </Row>
  );
};

export default React.memo(GameGraphTop);
