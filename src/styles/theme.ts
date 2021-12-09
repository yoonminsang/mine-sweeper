import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  mobile: '@media all and (max-width: 480px)',
  tablet: '@media all and (min-width:480px) and (max-width:1200px)',
  desktop: '@media all and (min-width: 1200px)',
  lightGrey: '#eee',
  grey: '#e3e3e3',
  darkGrey: '#c1c1c1',
  white: '#fcfcfc',
};

export default theme;
