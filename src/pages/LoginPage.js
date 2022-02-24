import React from 'react';
import { Box, Grid, Paper } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Grid
      container
      component='main'
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundImage:
          'url(https://source.unsplash.com/random/?city,night)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light'
            ? t.palette.grey[50]
            : t.palette.grey[900],
        backgroundSize: 'cover',
        boxShadow: 'inset 0 0 0 2000px rgba(113, 113, 113, 0.0)',
        backgroundPosition: 'center',
      }}
    >
      <CssBaseline />
      <Grid item xs={12} sm={7} md={7} lg={3}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Paper
            elevation={5}
            sx={{ padding: '30px', borderRadius: '20px' }}
          >
            <LoginForm />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
