import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

import Dashboard from '../pages/Dashboard';
import MyDrawer from '../components/MyDrawer';

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<MyDrawer />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
