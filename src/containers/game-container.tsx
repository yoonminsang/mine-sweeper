import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '@/components/game';
import { RootState } from '@/store';
import { leftClick, rightClick, syncClick } from '@/store/game';

const [LEFT_BUTTONS, RIGHT_BUTTONS] = [0, 2];

const GameContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentGraph, remainMine, timer, isSuccess, isFail } = useSelector(({ game }: RootState) => ({
    currentGraph: game.currentGraph,
    remainMine: game.remainMine,
    timer: game.timer,
    isSuccess: game.isSuccess,
    isFail: game.isFail,
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

  return (
    <Game
      currentGraph={currentGraph}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      remainMine={remainMine}
      timer={timer}
      isSuccess={isSuccess}
      isFail={isFail}
    />
  );
};

export default GameContainer;
