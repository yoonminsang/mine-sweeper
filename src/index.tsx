import React from 'react';
import ReactDom from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App from './app';
import GlobalStyle from './styles/global-style';
import theme from './styles/theme';
import { rootReducer, rootSaga } from './store';
import { DIFFICULTY } from './constants';
import { makeGraph } from './store/game';

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === 'development' ? [sagaMiddleware, logger] : [sagaMiddleware];
// const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

const init = () => {
  store.dispatch({ type: makeGraph.type, payload: DIFFICULTY.beginner });
};

init();

ReactDom.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  window.document.getElementById('root'),
);
