import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

import Dashboard from '../pages/Dashboard';
import MyDrawer from '../components/MyDrawer';
import Users from '../pages/Users';
import Database from '../pages/Database';
import Reports from '../pages/Reports';

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/database' element={<Database />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
