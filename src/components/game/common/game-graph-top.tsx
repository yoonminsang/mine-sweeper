/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

interface IProps {
  index: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameGraphTop: React.FC<IProps> = ({ index }) => {
  const indexArr = Array(index).fill(null);
  return (
    <Row>
      <img src="http://freeminesweeper.org/images/bordertl.gif" alt="img" />
      {indexArr.map((_, i) => {
        return <img key={i} src="http://freeminesweeper.org/images/bordertb.gif" alt="img" width={16} height={10} />;
      })}
      <img src="http://freeminesweeper.org/images/bordertr.gif" alt="img" />
    </Row>
  );
};

export default React.memo(GameGraphTop);
