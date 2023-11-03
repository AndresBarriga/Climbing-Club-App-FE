import { createTheme } from '@mui/material/styles';
import { green, amber, grey, deepOrange, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: amber[500],
    },
    background: {
      default: grey[50],
    },
    text: {
      primary: grey[900],
    },
    error: {
      main: deepOrange[500],
    },
    common: {
      link: blue[500], // Custom link color
    },
  },
});

export default theme;