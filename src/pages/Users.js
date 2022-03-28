import React, { useEffect, useState } from 'react';
import {
  Typography,
  Divider,
  Box,
  Paper,
  Button,
} from '@mui/material';
import UsersTable from '../components/UsersTable';
import { Link } from 'react-router-dom';

import axiosInstance from '../apis/axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const fbUsers = await axiosInstance.get('/auth');

      setUsers(fbUsers.data.users.users);
      console.log(fbUsers.data.users.users);
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <Box
        component={Paper}
        sx={{
          p: 1,
          mt: 1,
        }}
        elevation={3}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant='h5'>Manage Users</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
          <Button
            component={Link}
            sx={{ mr: 10 }}
            variant='contained'
            to='addUser'
          >
            Add user
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <UsersTable users={users} />
      </Box>
    </div>
  );
};

export default Users;
