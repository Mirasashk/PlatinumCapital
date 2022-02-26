import React from 'react';
import { getAuth } from 'firebase/auth';
import { Button } from '@mui/material';

const Dashboard = () => {
  const auth = getAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return <div>Dashboard</div>;
};

export default Dashboard;
