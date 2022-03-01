import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

import Dashboard from '../pages/Dashboard';
import MyDrawer from '../components/MyDrawer';
import Users from '../pages/Users';
import Database from '../pages/Database';
import Reports from '../pages/Reports';
import AddUser from '../pages/AddUser';

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/addUser' element={<AddUser />} />
        <Route path='/database' element={<Database />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
