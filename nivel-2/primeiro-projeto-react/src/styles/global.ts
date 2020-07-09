import { createGlobalStyle } from 'styled-components';

import githugbg from '../assets/images/background-github.svg';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}

#root{
  max-width: 960px;
  margin: 0 auto;
  padding-top:40px;

}

body{
  background: url(${githugbg}) #f0f0f5 no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}

body,input, button{
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

button{
  cursor: pointer;
}

`;
