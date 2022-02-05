import React from 'react';
import styled from 'styled-components';
import time_ from '@/assets/images/time-.gif';
import time0 from '@/assets/images/time0.gif';
import time1 from '@/assets/images/time1.gif';
import time2 from '@/assets/images/time2.gif';
import time3 from '@/assets/images/time3.gif';
import time4 from '@/assets/images/time4.gif';
import time5 from '@/assets/images/time5.gif';
import time6 from '@/assets/images/time6.gif';
import time7 from '@/assets/images/time7.gif';
import time8 from '@/assets/images/time8.gif';
import time9 from '@/assets/images/time9.gif';

interface IProps {
  number: '-' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const Img = styled.img`
  width: 13px;
  height: 23px;
`;

const TimerImg = {
  '-': time_,
  0: time0,
  1: time1,
  2: time2,
  3: time3,
  4: time4,
  5: time5,
  6: time6,
  7: time7,
  8: time8,
  9: time9,
};

const GameTimer: React.FC<IProps> = ({ number }) => {
  const src = TimerImg[number];
  return <Img src={src} alt={String(number)} />;
};

export default GameTimer;
