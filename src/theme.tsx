import { indigo } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    background: {
      default: indigo['50'],
    },
  },
});

export default theme;
