import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
  },
});
const ActionsGroup = ({ classes, className, children }) => {
  return (
    <div className={classNames(classes.container, className)}>{children}</div>
  );
};

export default withStyles(styles)(ActionsGroup);
