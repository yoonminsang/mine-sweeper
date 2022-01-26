import React from 'react';
import styled from 'styled-components';
import GameContent from './game-content';
import GameHeader from './game-header';

const Wrapper = styled.div``;

const Game = () => {
  return (
    <Wrapper>
      <GameHeader />
      <GameContent />
    </Wrapper>
  );
};

export default Game;
