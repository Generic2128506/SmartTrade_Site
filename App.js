import React from 'react';
import theme from './theme';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import AppRouter from './AppRouter';

const App = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>
);

export default App;
