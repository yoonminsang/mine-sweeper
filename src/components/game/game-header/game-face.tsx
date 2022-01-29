import React from 'react';
import styled from 'styled-components';
import { TFace } from '@/types/game';
import dead from '@/assets/images/facedead.gif';
import smile from '@/assets/images/facesmile.gif';
import win from '@/assets/images/facewin.gif';

interface IProps {
  face: TFace;
  margin: number;
}

const Img = styled.img`
  width: 26;
  height: 26;
`;

const GameFace: React.FC<IProps> = ({ face, margin }) => {
  let src = '';
  switch (face) {
    case 'dead':
      src = dead;
      break;
    case 'smile':
      src = smile;
      break;
    case 'win':
      src = win;
      break;
    default:
      break;
  }
  return <Img src={src} alt="img" style={{ margin: `0 ${margin}px` }} />;
};

export default React.memo(GameFace);
