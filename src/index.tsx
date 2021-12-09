import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './app';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

ReactDom.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  window.document.getElementById('root'),
);
