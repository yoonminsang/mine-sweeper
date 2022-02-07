/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { css } from 'styled-components';
import { TDifficulty } from '@/types/game';
import checked from '@/assets/images/checked.gif';
import notChecked from '@/assets/images/notchecked.gif';

interface IProps {
  visible: boolean;
  difficulty: TDifficulty;
  onClickDifficultyHandler: (difficulty: TDifficulty) => void;
}

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
`;

const Img = styled.img`
  margin: 0 3px;
  width: 10px;
  height: 10px;
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
          const src = difficultyValue === difficulty ? checked : notChecked;
          const alt = difficultyValue === difficulty ? 'checked' : 'notChecked';
          return (
            <Button key={index} type="button" onClick={() => onClickDifficultyHandler(difficultyValue)}>
              <Img src={src} alt={alt} />
              {difficultyValue}
            </Button>
          );
        })}
      </BorderDiv>
    </Wrapper>
  );
};

export default MenuModal;
