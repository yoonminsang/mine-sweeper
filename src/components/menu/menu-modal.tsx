/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { css } from 'styled-components';
import { TDifficulty } from '@/types/game';

interface IProps {
  visible: boolean;
  difficulty: TDifficulty;
  onClickDifficultyHandler: (difficulty: TDifficulty) => void;
}

const CHECK = 'http://freeminesweeper.org/images/checked.gif';
const NOT_CHECK = 'http://freeminesweeper.org/images/notchecked.gif';

const Wrapper = styled.div<{ visible: boolean }>`
  width: 100px;
  position: absolute;
  background-color: #c0c0c0;
  border: 1px solid black;
  font-size: 13px;
  top: 33px;
  ${(props) =>
    !props.visible &&
    css`
      opacity: 0;
      user-select: none;
      pointer-events: none;
    `};
`;

const BorderDiv = styled.div`
  border: 1px solid black;
  margin: 1px;
  img {
    margin: 0 3px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
`;

const MenuModal: React.FC<IProps> = ({ visible, difficulty, onClickDifficultyHandler }) => {
  const difficultyArr: TDifficulty[] = ['beginner', 'intermediate', 'expert', 'custom'];
  return (
    <Wrapper visible={visible}>
      <BorderDiv>
        {difficultyArr.map((difficultyValue, index) => {
          const src = difficultyValue === difficulty ? CHECK : NOT_CHECK;
          return (
            <Button key={index} type="button" onClick={() => onClickDifficultyHandler(difficultyValue)}>
              <img src={src} alt="img" />
              {difficultyValue}
            </Button>
          );
        })}
      </BorderDiv>
    </Wrapper>
  );
};

export default MenuModal;
