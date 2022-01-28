import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
   modify yoonminsang
*/

* {
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
*,
::before,
::after {
  box-sizing: border-box;
  background-repeat: no-repeat;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  font-family: "Noto Sans KR", sans-serif;
  /* line-height: 1; */
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
input,
textarea {
  outline: 0;
  background-color: inherit;
}
button {
  color: inherit;
  border:0;
}
html{
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${(props) => props.theme.lightGrey};
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.lightGrey};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${(props) => props.theme.darkGrey};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
}
div{
  word-break: break-all;
}
body{
  background:#C0C0C0;
}
`;

export default GlobalStyle;
