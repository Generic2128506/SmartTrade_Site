import React, { useState } from 'react';
import { resetPassword } from '../api/user-api';

import { Button, Paper, TextField, withStyles } from '@material-ui/core';
import { Page } from '../components';

function ResetPasswordPage({ classes, location, history }) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  function handleChange(event) {
    setPassword(event.target.value);
  }

  async function handleReset() {
    try {
      setSubmitting(true);
      await resetPassword(password, location.search);
      history.replace('/search');
      setSubmitting(false);
    } catch (err) {
      alert('Cannot reset password due to error');
      setSubmitting(false);
    }
  }

  const disabled = isSubmitting || !password;

  function render() {
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <TextField
            name="password"
            className={classes.textField}
            type="password"
            autoComplete="new-password"
            variant="outlined"
            placeholder="NEW PASSWORD"
            margin="normal"
            fullWidth
            value={password}
            onChange={handleChange}
          />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            disabled={disabled}
            onClick={handleReset}
          >
            SUBMIT
          </Button>
        </Paper>
      </div>
    );
  }
  return <Page render={render} />;
}

const styles = (theme) => {
  const colors = theme.palette.custom.resetPasswordPage;

  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: colors.dialog,
      padding: '24px',
      width: '400px',
      boxShadow: 'none',
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      width: '100%',
    },
    textField: {
      backgroundColor: colors.textField.background,
    },
  };
};

export default withStyles(styles)(ResetPasswordPage);
