import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Database from '../pages/Database';
import Reports from '../pages/Reports';
import AddUser from '../pages/AddUser';
import Leads from '../pages/Leads';

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/addUser' element={<AddUser />} />
        <Route path='/database' element={<Database />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/leads' element={<Leads />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
