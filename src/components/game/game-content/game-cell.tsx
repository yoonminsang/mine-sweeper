import React from 'react';
import styled from 'styled-components';
import { TCurrentGraphCell } from '@/types/game';

interface IProps {
  currentGraphCell: TCurrentGraphCell;
  onMouseDown: (e: React.MouseEvent, row: number, column: number) => void;
  onMouseUp: (e: React.MouseEvent, row: number, column: number) => void;
  row: number;
  column: number;
}

const Button = styled.button`
  width: 16px;
  height: 16px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const GameCell: React.FC<IProps> = ({ currentGraphCell, onMouseDown, onMouseUp, row, column }) => {
  let src = 'http://freeminesweeper.org/images/';
  switch (currentGraphCell) {
    case 'notSelect':
      src += 'blank.gif';
      break;
    case 'flag':
      src += 'bombflagged.gif';
      break;
    case 'bombRevealed':
      src += 'bombrevealed.gif';
      break;
    case 'bombDeath':
      src += 'bombdeath.gif';
      break;
    case 'bombmIsFlagged':
      src += 'bombmisflagged.gif';
      break;
    case 'question':
      src += 'bombquestion.gif';
      break;
    default:
      src += `open${currentGraphCell}.gif`;
  }
  return (
    <Button onMouseDown={(e) => onMouseDown(e, row, column)} onMouseUp={(e) => onMouseUp(e, row, column)}>
      <Img src={src} alt="img" />
    </Button>
  );
};

export default GameCell;
