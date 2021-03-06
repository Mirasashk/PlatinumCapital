import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Database from '../pages/Database';
import Reports from '../pages/Reports';
import AddUser from '../pages/AddUser';
import Collections from '../pages/Collections';
import UploadLeads from '../pages/UploadLeads';
import Leads from '../pages/Leads';
import LeadLookUp from '../pages/LeadLookUp';
import LeadDetails from '../pages/LeadDetails';
import MyUserDetail from '../pages/MyUserDetail';
import UserDetail from '../pages/UserDetail';

const MyRoutes = (props) => {
  const [accessLevel, setAccessLevel] = useState(false);

  useEffect(() => {
    if (props.userInfo.access === 'admin') {
      setAccessLevel(true);
    } else {
      setAccessLevel(false);
    }
  }, [props.userInfo.access]);

  return (
    <div>
      <Routes>
        {accessLevel ? (
          <>
            <Route index path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/user/:userid' element={<UserDetail />} />
            <Route path='/myaccount' element={<MyUserDetail />} />
            <Route path='/users/addUser' element={<AddUser />} />
            <Route path='/database' element={<Database />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/collections' element={<Collections />} />
            <Route path='/leads' element={<Leads />} />
            <Route path='/upload' element={<UploadLeads />} />
            <Route path='/lead/lookup' element={<LeadLookUp />} />
            <Route
              path='/lead/lookup/:collection/:leadId'
              element={<LeadDetails />}
            />
          </>
        ) : (
          <>
            <Route path='/myaccount' element={<MyUserDetail />} />
            <Route path='/lead/lookup' element={<LeadLookUp />} />
            <Route
              path='/lead/lookup/:collection/:leadId'
              element={<LeadDetails />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default MyRoutes;
