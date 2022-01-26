import React from 'react';
import GameContainer from './containers/game-container';
import MenuContainer from './containers/menu-container';

const App: React.FC = () => {
  return (
    <>
      <MenuContainer />
      <GameContainer />
    </>
  );
};

export default App;
