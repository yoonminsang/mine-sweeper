import React from 'react';
import styled from 'styled-components';
import { TFace } from '@/types/game';

interface IProps {
  face: TFace;
  margin: number;
}

const Img = styled.img`
  width: 26;
  height: 26;
`;

const GameFace: React.FC<IProps> = ({ face, margin }) => {
  return (
    <Img src={`http://freeminesweeper.org/images/face${face}.gif`} alt="img" style={{ margin: `0 ${margin}px` }} />
  );
};

export default GameFace;
