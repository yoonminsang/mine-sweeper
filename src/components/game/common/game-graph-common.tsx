/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

interface IProps {
  index: number;
}

const Img = styled.img`
  width: 16px;
  height: 10px;
`;

const GameGraphCommon: React.FC<IProps> = ({ index }) => {
  const indexArr = Array(index).fill(null);
  return (
    <>
      {indexArr.map((_, i) => {
        return <Img key={i} src="http://freeminesweeper.org/images/bordertb.gif" alt="img" />;
      })}
    </>
  );
};

export default React.memo(GameGraphCommon);
