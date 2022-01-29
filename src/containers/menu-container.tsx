import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@/components/menu';
import { RootState } from '@/store';
import { changeDifficulty } from '@/store/menu';
import { IDifficulty } from '@/types/game';

const MenuContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { difficulty, gameInitOption } = useSelector(({ menu }: RootState) => ({
    difficulty: menu.difficulty,
    gameInitOption: { mine: menu.mine, row: menu.row, column: menu.column },
  }));

  const onChangeDifficulty = useCallback(
    (difficultyObj: IDifficulty) => {
      dispatch({ type: changeDifficulty.type, payload: difficultyObj });
    },
    [dispatch],
  );
  return <Menu difficulty={difficulty} onChangeDifficulty={onChangeDifficulty} gameInitOption={gameInitOption} />;
};

export default MenuContainer;
