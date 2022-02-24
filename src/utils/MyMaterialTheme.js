import { createTheme } from '@mui/material';

// Choose primary and secondary colors use color tool at
// https://material.io/resources/color
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c4766',
      light: '#597294',
      contrastText: '#fff',
    },
    secondary: {
      main: '#006978',

      contrastText: '#fff',
    },
  },
});

export default theme;
