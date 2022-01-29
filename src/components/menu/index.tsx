import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import MenuModal from './menu-modal';
import { IDifficulty, IGameInitOption, TDifficulty } from '@/types/game';
import MenuCustomModal from './menu-custom-modal';
import { DIFFICULTY } from '@/constants';

interface IProps {
  difficulty: TDifficulty;
  onChangeDifficulty: (difficulty: IDifficulty) => void;
  gameInitOption: IGameInitOption;
}

const Wrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const Button = styled.button`
  font-size: 13px;
`;

const Menu: React.FC<IProps> = ({ difficulty, onChangeDifficulty, gameInitOption }) => {
  const [visible, setVisible] = useState(false);
  const onDifficultyModalHandler = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);

  const [customVisible, setCustomVisible] = useState(false);

  const onClickDifficultyHandler = useCallback(
    (difficultyValue: TDifficulty) => {
      switch (difficultyValue) {
        case 'beginner':
          onChangeDifficulty({ difficulty: difficultyValue, ...DIFFICULTY.beginner });
          setVisible(false);
          break;
        case 'intermediate':
          onChangeDifficulty({ difficulty: difficultyValue, ...DIFFICULTY.intermediate });
          setVisible(false);
          break;
        case 'expert':
          onChangeDifficulty({ difficulty: difficultyValue, ...DIFFICULTY.expert });
          setVisible(false);
          break;
        default:
          setVisible(false);
          setCustomVisible(true);
          break;
      }
    },
    [onChangeDifficulty, setCustomVisible, setVisible],
  );

  const onSubmitCustomDifficultyHandler = useCallback(
    (e: React.FormEvent, gameInitOption: IGameInitOption) => {
      console.log('submit');
      e.preventDefault();
      const { row, column, mine } = gameInitOption;
      if (row <= 0 || row > 100 || column <= 0 || column > 100) {
        alert('행, 열은 1부터 100까지만 입력해주세요');
        return;
      }
      if (row * column <= mine) {
        alert('지뢰 숫자를 확인해주세요');
        return;
      }
      onChangeDifficulty({ difficulty: 'custom', ...gameInitOption });
      setCustomVisible(false);
    },
    [onChangeDifficulty],
  );

  const onCancelCustomDifficultyHandler = useCallback(() => {
    setCustomVisible(false);
  }, []);

  return (
    <Wrapper>
      <Button onClick={onDifficultyModalHandler}>Game</Button>
      <MenuModal visible={visible} difficulty={difficulty} onClickDifficultyHandler={onClickDifficultyHandler} />
      <MenuCustomModal
        customVisible={customVisible}
        onSubmitCustomDifficultyHandler={onSubmitCustomDifficultyHandler}
        onCancelCustomDifficultyHandler={onCancelCustomDifficultyHandler}
        gameInitOption={gameInitOption}
      />
    </Wrapper>
  );
};

export default Menu;
