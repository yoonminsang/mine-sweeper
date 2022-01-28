import React from 'react';
import styled from 'styled-components';
import GameContentContainer from './containers/game-content-container';
import GameHeaderContainer from './containers/game-header-container';
import MenuContainer from './containers/menu-container';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(FlexColumn)`
  margin-top: 20px;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <FlexRow>
        <FlexColumn>
          <MenuContainer />
          <GameHeaderContainer />
          <GameContentContainer />
        </FlexColumn>
      </FlexRow>
    </Wrapper>
  );
};

export default App;
