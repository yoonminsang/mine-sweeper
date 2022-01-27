import React, { useMemo } from 'react';
import styled from 'styled-components';
import GameGraphTop from '../common/game-graph-top';
import GameFace from './game-face';
import GameTimer from './game-timer';

interface IProps {
  index: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 26px;
`;

const Button = styled.a`
  display: flex;
`;

const GameHeader: React.FC<IProps> = ({ index }) => {
  const margin = useMemo(() => (16 * index - (13 * 6 + 26)) / 2, [index]);
  return (
    <Wrapper>
      <GameGraphTop index={index} />
      <Row>
        <img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" width={10} height={26} />
        <GameTimer number={0} />
        <GameTimer number={0} />
        <GameTimer number={0} />
        <Button>
          <GameFace face="smile" margin={margin} />
        </Button>
        <GameTimer number={0} />
        <GameTimer number={0} />
        <GameTimer number={0} />
        <img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" width={10} height={26} />
      </Row>
    </Wrapper>
  );
};

export default GameHeader;
