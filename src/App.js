import React, { useEffect, useState } from 'react';

import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
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
  const dbRef = ref(getDatabase());
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (location.pathname === '/login') {
        get(child(dbRef, `users/${auth.currentUser.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setUserInfo(snapshot.val());
            } else {
              console.log('No Data available');
            }
          })
          .catch((error) => {
            console.log(error);
          });
        navigate('/*');
      } else {
        get(child(dbRef, `users/${auth.currentUser.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserInfo(snapshot.val());
            } else {
              console.log('No Data available');
            }
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(location.pathname);
      }
    });
  }, [auth, dbRef, location.pathname, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/*'
            element={<MyDrawer userInfo={userInfo} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
