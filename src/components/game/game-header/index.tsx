import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TFace } from '@/types/game';
import GameGraphTop from '../common/game-graph-top';
import GameFace from './game-face';
import GameTimer from './game-timer';

interface IProps {
  index: number;
  remainMine: number;
  timer: number;
  isSuccess: boolean;
  isFail: boolean;
  initGameHandler: () => void;
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

const Button = styled.button`
  display: flex;
`;

const Img = styled.img`
  width: 10px;
  height: 26px;
`;

const GameHeader: React.FC<IProps> = ({ index, remainMine, timer, isSuccess, isFail, initGameHandler }) => {
  const [face, setFace] = useState<TFace>('smile');
  useEffect(() => {
    if (isFail) setFace('dead');
    else if (isSuccess) setFace('win');
    else setFace('smile');
  }, [isSuccess, isFail]);

  const margin = useMemo(() => (16 * index - (13 * 6 + 26)) / 2, [index]);
  const remainMineArr = remainMine.toString().split('');
  if (remainMine < 0) while (remainMineArr.length < 3) remainMineArr.splice(1, 0, '0');
  else while (remainMineArr.length < 3) remainMineArr.unshift('0');
  const timerArr = timer.toString().split('');
  while (timerArr.length < 3) timerArr.unshift('0');

  return (
    <Wrapper>
      <GameGraphTop index={index} />
      <Row>
        <Img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" />
        <GameTimer number={remainMineArr[0]} />
        <GameTimer number={remainMineArr[1]} />
        <GameTimer number={remainMineArr[2]} />
        <Button onClick={initGameHandler}>
          <GameFace face={face} margin={margin} />
        </Button>
        <GameTimer number={timerArr[0]} />
        <GameTimer number={timerArr[1]} />
        <GameTimer number={timerArr[2]} />
        <Img src="http://freeminesweeper.org/images/borderlr.gif" alt="img" />
      </Row>
    </Wrapper>
  );
};

export default GameHeader;
