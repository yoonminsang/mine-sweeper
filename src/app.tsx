import React from 'react';
import GameContentContainer from './containers/game-content-container';
import GameHeaderContainer from './containers/game-header-container';
import MenuContainer from './containers/menu-container';

const App: React.FC = () => {
  return (
    <>
      <MenuContainer />
      <GameHeaderContainer />
      <GameContentContainer />
    </>
  );
};

export default App;
