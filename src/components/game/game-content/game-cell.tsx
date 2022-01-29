import React from 'react';
import styled from 'styled-components';
import { TCurrentGraphCell } from '@/types/game';
import blank from '@/assets/images/blank.gif';
import bombflagged from '@/assets/images/bombflagged.gif';
import bombrevealed from '@/assets/images/bombrevealed.gif';
import bombdeath from '@/assets/images/bombdeath.gif';
import bombmisflagged from '@/assets/images/bombmisflagged.gif';
import bombquestion from '@/assets/images/bombquestion.gif';
import open0 from '@/assets/images/open0.gif';
import open1 from '@/assets/images/open1.gif';
import open2 from '@/assets/images/open2.gif';
import open3 from '@/assets/images/open3.gif';
import open4 from '@/assets/images/open4.gif';
import open5 from '@/assets/images/open5.gif';
import open6 from '@/assets/images/open6.gif';
import open7 from '@/assets/images/open7.gif';
import open8 from '@/assets/images/open8.gif';

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
  let src = '';
  switch (currentGraphCell) {
    case 'notSelect':
      src = blank;
      break;
    case 'flag':
      src = bombflagged;
      break;
    case 'bombRevealed':
      src = bombrevealed;
      break;
    case 'bombDeath':
      src = bombdeath;
      break;
    case 'bombmIsFlagged':
      src = bombmisflagged;
      break;
    case 'question':
      src = bombquestion;
      break;
    case 0:
      src = open0;
      break;
    case 1:
      src = open1;
      break;
    case 2:
      src = open2;
      break;
    case 3:
      src = open3;
      break;
    case 4:
      src = open4;
      break;
    case 5:
      src = open5;
      break;
    case 6:
      src = open6;
      break;
    case 7:
      src = open7;
      break;
    case 8:
      src = open8;
      break;
    default:
      break;
  }
  // default:
  //   src = open[`open${currentGraphCell}`];
  //   break;
  return (
    <Button onMouseDown={(e) => onMouseDown(e, row, column)} onMouseUp={(e) => onMouseUp(e, row, column)}>
      <Img src={src} alt={currentGraphCell.toString()} />
    </Button>
  );
};

export default React.memo(GameCell);
