import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '@/components/game';
import { RootState } from '@/store';
import { leftClick, rightClick, syncClick } from '@/store/game';

const [LEFT_BUTTONS, RIGHT_BUTTONS] = [0, 2];

const GameContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentGraph, remainMine, timer, timerId, isProcess, isSuccess, isFail, isEnd } = useSelector(
    ({ game }: RootState) => ({
      currentGraph: game.currentGraph,
      remainMine: game.remainMine,
      timer: game.timer,
      timerId: game.timerId,
      isProcess: game.isProcess,
      isSuccess: game.isSuccess,
      isFail: game.isFail,
      isEnd: game.isEnd,
    }),
  );

  const left = useRef(false);
  const right = useRef(false);

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
        if (right.current) onClickSyncHandler(row, column);
        left.current = true;
      } else if (e.button === RIGHT_BUTTONS) {
        if (left.current) onClickSyncHandler(row, column);
        right.current = true;
      }
    },
    [onClickSyncHandler],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent, row: number, column: number) => {
      if (e.button === LEFT_BUTTONS) {
        if (!right.current) onClickLeftHandler(row, column);
        left.current = false;
      } else if (e.button === RIGHT_BUTTONS) {
        if (!left.current) onClickRightHandler(row, column);
        right.current = false;
      }
    },
    [onClickLeftHandler, onClickRightHandler],
  );

  return <Game currentGraph={currentGraph} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />;
};

export default GameContainer;
