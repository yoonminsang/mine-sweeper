/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { TCurrentGraph } from '@/types/game';
import GameCell from './game-cell';
import GameGraphBottom from '../common/game-graph-bottom';
import GameGraphCenter from '../common/game-graph-center';
import borderlr from '@/assets/images/borderlr.gif';

interface IProps {
  currentGraph: TCurrentGraph;
  onMouseDown: (e: React.MouseEvent, row: number, column: number) => void;
  onMouseUp: (e: React.MouseEvent, row: number, column: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  width: 10px;
  height: 16px;
`;

const GameContent: React.FC<IProps> = ({ currentGraph, onMouseDown, onMouseUp }) => {
  return (
    <Wrapper>
      <GameGraphCenter index={currentGraph[0].length} />
      {currentGraph.map((currentGraphRow, i) => {
        return (
          <Row key={i}>
            <Img src={borderlr} alt="borderlr" />
            {currentGraphRow.map((currentGraphCell, j) => {
              return (
                <GameCell
                  key={j}
                  currentGraphCell={currentGraphCell}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  row={i}
                  column={j}
                />
              );
            })}
            <Img src={borderlr} alt="borderlr" />
          </Row>
        );
      })}
      <GameGraphBottom index={currentGraph[0].length} />
    </Wrapper>
  );
};

export default GameContent;
