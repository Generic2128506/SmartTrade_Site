import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const PageFooter = ({ classes }) => {
  function handlePolicyClick() {
    window.open('policy.pdf');
    return false;
  }

  return (
    <div className={classes.footer}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="caption" className={classes.link}>
          <a href="#" onClick={handlePolicyClick}>
            Terms and Conditions
          </a>
        </Typography>
        <Typography variant="caption" className={classes.link}>
          <Link to="/about">About us</Link>
        </Typography>
        <Typography variant="caption" className={classes.link}>
          <Link to="/contacts">Contacts</Link>
        </Typography>
        <div className={classes.paylogo}>
          <img alt="paylogo" src="/paylogo.png" />
        </div>
      </Toolbar>
    </div>
  );
};
/*
<div className={classes.paylogo}>
  <img src="/visa-pay-logo.svg" />
  <img src="/master-card-logo.svg" />
</div>
*/
const styles = (theme) => {
  const colors = theme.palette.custom.pageHeader;
  return {
    footer: {
      backgroundColor: theme.palette.custom.tableHeader,
      minHeight: '36px',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        minHeight: '24px',
      },
    },
    toolbar: {
      flex: '1 0 0px',
      justifyContent: 'space-between',
    },
    name: {
      color: theme.palette.custom.logo,
      marginLeft: theme.spacing.unit,
    },
    paylogo: {
      display: 'flex',
      alignItems: 'center',
      '& > img': {
        height: '40px',
      },
      [theme.breakpoints.down('xs')]: {
        '& > img': {
          height: '20px',
        },
      },
    },
    address: {
      color: theme.palette.custom.logo,
      fontWeight: 'normal',
    },
    link: {
      color: theme.palette.custom.logo,
      fontWeight: 'normal',
    },
  };
};

export default withStyles(styles)(PageFooter);
