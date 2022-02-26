import React, { useEffect, useState } from 'react';

import MyRoutes from './utils/routes';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './utils/MyMaterialTheme';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyDrawer from './components/MyDrawer';

const App = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (location.pathname == '/login') {
        navigate('/*');
      } else {
        navigate(location.pathname);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={<MyDrawer />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
