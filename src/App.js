import React, { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import MyRoutes from './utils/routes';

import firebase from 'firebase/compat/app';

import { firebaseConfig } from './apis/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './utils/MyMaterialTheme';
const App = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(auth);
      if (!user) {
        navigate('/login');
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <MyRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
