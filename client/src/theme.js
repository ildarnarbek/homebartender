import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2229',
      contrastText: '#fff'
    },
    secondary: {
      main: '#da2337',
      contrastText: '#fff'
    },
    text: {
      primary: '#1f2229',
      secondary: '#939aa2'
    },
    divider: '#e8e6e6'
  }
});

export default theme;
