import React from 'react';
import styled from 'styled-components';
import { TCurrentGraphCell } from '@/types/game';

interface IProps {
  currentGraphCell: TCurrentGraphCell;
}

const Button = styled.a`
  width: 16px;
  height: 16px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const GameCell: React.FC<IProps> = ({ currentGraphCell }) => {
  let src = 'http://freeminesweeper.org/images/';
  switch (currentGraphCell) {
    case 'notSelect':
      src += 'blank.gif';
      break;
    case 'mine':
      src += 'bombflagged.gif';
      break;
    case 'question':
      src += 'bombquestion.gif';
      break;
    case null:
      src += `open0.gif`;
      break;
    default:
      src += `open${currentGraphCell}.gif`;
  }
  return (
    <Button>
      <Img src={src} alt="img" />
    </Button>
  );
};

export default GameCell;
