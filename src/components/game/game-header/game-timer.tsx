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
  number: string;
}

const Img = styled.img`
  heigth: 23px;
`;

const GameTimer: React.FC<IProps> = ({ number }) => {
  let src = '';
  switch (number) {
    case '-':
      src = time_;
      break;
    case '0':
      src = time0;
      break;
    case '1':
      src = time1;
      break;
    case '2':
      src = time2;
      break;
    case '3':
      src = time3;
      break;
    case '4':
      src = time4;
      break;
    case '5':
      src = time5;
      break;
    case '6':
      src = time6;
      break;
    case '7':
      src = time7;
      break;
    case '8':
      src = time8;
      break;
    case '9':
      src = time9;
      break;
    default:
      break;
  }
  return <Img src={src} alt={number} />;
};

export default GameTimer;
