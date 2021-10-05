import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  pageContent: {
    flexDirection: 'column',
    paddingTop: 3 * theme.spacing.unit,
    paddingBottom: 3 * theme.spacing.unit,
    flex: '1 0 0px',
    overflowY: 'auto',
    maxWidth: '1264px',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const PageContent = ({ classes, children, className }) => {
  return (
    <div className={classNames(classes.pageContent, className)}>{children}</div>
  );
};

export default withStyles(styles)(PageContent);
