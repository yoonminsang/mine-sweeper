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

const Img = styled.img`
  width: 10px;
  height: 10px;
`;

const GameGraphCenter: React.FC<IProps> = ({ index }) => {
  return (
    <Row>
      <Img src={borderjointl} alt="borderjointl" />
      <GameGraphCommon index={index} />
      <Img src={borderjointr} alt="borderjointr" />
    </Row>
  );
};

export default React.memo(GameGraphCenter);
