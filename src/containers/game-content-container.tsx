import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { leftClick, rightClick, syncClick } from '@/store/game';
import GameContent from '@/components/game/game-content';

const [LEFT_BUTTONS, RIGHT_BUTTONS] = [0, 2];

const GameContentContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentGraph } = useSelector(({ game }: RootState) => ({
    currentGraph: game.currentGraph,
  }));

  const leftCliking = useRef(false);
  const rightCliking = useRef(false);

  const onClickLeftHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: leftClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  const onClickRightHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: rightClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  const onClickSyncHandler = useCallback(
    (row: number, column: number) => {
      dispatch({ type: syncClick.type, payload: { row, column } });
    },
    [dispatch],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent, row: number, column: number) => {
      if (e.button === LEFT_BUTTONS) {
        if (rightCliking.current) onClickSyncHandler(row, column);
        leftCliking.current = true;
      } else if (e.button === RIGHT_BUTTONS) {
        if (leftCliking.current) onClickSyncHandler(row, column);
        rightCliking.current = true;
      }
    },
    [onClickSyncHandler],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent, row: number, column: number) => {
      if (e.button === LEFT_BUTTONS) {
        if (!rightCliking.current) onClickLeftHandler(row, column);
        leftCliking.current = false;
      } else if (e.button === RIGHT_BUTTONS) {
        if (!leftCliking.current) onClickRightHandler(row, column);
        rightCliking.current = false;
      }
    },
    [onClickLeftHandler, onClickRightHandler],
  );

  return <GameContent currentGraph={currentGraph} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />;
};

export default GameContentContainer;
