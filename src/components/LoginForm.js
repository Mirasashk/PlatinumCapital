import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Logo from '../assets/images/Logo.png';
import AuthProvider from '../utils/handleLogin';

const LoginForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    AuthProvider(event);
  };
  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, justifyContent: 'center', textAlign: 'center' }}
    >
      <img src={Logo} width='60px' style={{ textAlign: 'center' }} />
      <Typography sx={{ fontWeight: '500' }}>
        Login to your account
      </Typography>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
      />
      <FormControlLabel
        name='remember'
        id='remember'
        key='remember'
        control={
          <Checkbox
            value='remember'
            name='remember'
            color='primary'
          />
        }
        label='Remember me'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href='#' variant='body2'>
            Forgot password?
          </Link>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
