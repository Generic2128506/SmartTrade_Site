import React from 'react';
import classNames from 'classnames';
import { OutlinedInput, Typography, withStyles } from '@material-ui/core';

const TextField = ({ classes, className, label, ...rest }) => {
  return (
    <div className={classNames(classes.container, className)}>
      <Typography variant="caption">{label}</Typography>
      <OutlinedInput
        labelWidth={0}
        className={classes.input}
        classes={{
          inputMarginDense: classes.inputMarginDense,
        }}
        margin="dense"
        fullWidth={false}
        {...rest}
      />
    </div>
  );
};

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: theme.palette.background.paper,
  },
  inputMarginDense: {
    padding: theme.spacing.halfUnit,
    paddingTop: theme.spacing.halfUnit,
    paddingBottom: theme.spacing.halfUnit,
  },
});

export default withStyles(styles)(TextField);
