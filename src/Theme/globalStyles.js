// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    transition: all 0.3s linear;
  }
`;
