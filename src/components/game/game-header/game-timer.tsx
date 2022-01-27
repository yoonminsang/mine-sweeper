import React from 'react';
import styled from 'styled-components';

interface IProps {
  number: string;
}

const Img = styled.img`
  heigth: 23px;
`;

const GameTimer: React.FC<IProps> = ({ number }) => {
  return <Img src={`http://freeminesweeper.org/images/time${number}.gif`} alt="img" />;
};

export default GameTimer;
