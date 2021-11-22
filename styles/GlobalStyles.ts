import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: #fefefe;
    min-height: 100vh;
    margin: 0 auto;
    overscroll-behavior: none;
    width: 100%;
  }

  #root {
    overflow-x: hidden;
    min-height: 100vh;
  }
`;
