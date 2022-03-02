import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { handleCreateUser } from '../utils/handleUserMethods';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState('admin');

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleCreateUser(event);
    setTimeout(() => {
      navigate('/users');
    }, 1000);
  };

  const handleChange = (event) => {
    setAccess(event.target.value);
  };
  return (
    <div>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={9} md={9} lg={5}>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: '30px', borderRadius: '5px' }}
            >
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: '500' }}>
                  Create User
                </Typography>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='ViewCrunch'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='fName'
                  label='First Name'
                  name='fName'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='lName'
                  label='Last Name'
                  name='lName'
                />
                <TextField
                  margin='normal'
                  select
                  required
                  name='access'
                  fullWidth
                  label='Select Access'
                  value={access}
                  onChange={handleChange}
                >
                  {Roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddUser;

const Roles = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'manager',
    label: 'Manager',
  },
  {
    value: 'agent',
    label: 'Agent',
  },
];
