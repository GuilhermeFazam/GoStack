import React from 'react';

import SignIn from './pages/SignIn/index';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp/index';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
