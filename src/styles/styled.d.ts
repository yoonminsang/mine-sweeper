import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mobile: string;
    tablet: string;
    desktop: string;
    grey: string;
    lightGrey: string;
    darkGrey: string;
    white: string;
  }
}
