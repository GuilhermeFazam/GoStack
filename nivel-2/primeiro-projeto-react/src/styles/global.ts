import { createGlobalStyle } from 'styled-components';

import githugbg from '../assets/images/background-github.svg';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root{
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;

  }

  body{
    background: url(${githugbg}) #f0f0f5 no-repeat 70% top;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  body,input, button{
    font-family: 'Roboto', sans-serif;
  }

  button{
    cursor: pointer;
  }
`;
