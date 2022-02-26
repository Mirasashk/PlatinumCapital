import React, { useEffect, useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import Image from 'mui-image';
import { getAuth } from 'firebase/auth';
import MyRoutes from '../utils/routes';
import DrawerMenuItems from './DrawerMenuItems';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const GetAuth = async () => {
  return await getAuth();
};

export default function MyAppBarDrawer() {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState('');
  const [done, setDone] = useState(undefined);
  const componentMounted = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      const response = GetAuth();
      if (componentMounted.current) {
        response.then((result) => {
          setAuth(result);
          setDone(true);
        });
      }
    }, 1000);
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!done ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color='primary' />
        </Backdrop>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position='fixed' open={open}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                Platinum Capital
              </Typography>
              <Typography sx={{ pr: 4 }}>
                Hello, {auth.currentUser.email}
              </Typography>
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign Out
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant='permanent' open={open}>
            <DrawerHeader>
              <Box component='div' sx={{ flexGrow: 1, pl: 2 }}>
                <Image src={Logo} fit='contain' width='40px' />
              </Box>
              <IconButton
                onClick={handleDrawerClose}
                sx={{ justifyContent: 'flex-end' }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <DrawerMenuItems />
          </Drawer>
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <MyRoutes />
          </Box>
        </Box>
      )}
    </>
  );
}
