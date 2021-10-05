import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../assets/logo.png';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const PageHeader = ({
  classes,
  companyName,
  companyAddress,
  isLoggedIn,
  width,
  onLogin,
  onLogout,
  onSignUp,
}) => {
  const isMobile = isWidthDown('xs', width);
  const buttonVariant = isMobile ? 'text' : 'contained';
  return (
    <div className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <img src={Logo} />
        </div>
        <div className={classes.headerButtons}>
          {!isLoggedIn ? (
            <>
              <Button
                variant={buttonVariant}
                color="default"
                className={classes.signUpButton}
                onClick={onSignUp}
                size={'small'}
              >
                Sign Up
              </Button>
              <Button
                variant={buttonVariant}
                color="primary"
                className={classes.loginButton}
                onClick={onLogin}
                size={'small'}
              >
                Log In
              </Button>
            </>
          ) : (
            <Button
              variant={buttonVariant}
              color="primary"
              className={classes.loginButton}
              onClick={onLogout}
              size={'small'}
            >
              Log Out
            </Button>
          )}
        </div>
      </Toolbar>
    </div>
  );
};

const styles = (theme) => {
  const colors = theme.palette.custom.pageHeader;
  return {
    header: {
      backgroundColor: colors.header,
      minHeight: '96px',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        minHeight: '72px',
      },
    },
    headerButtons: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    loginButton: {
      // border: `1px solid ${colors.loginButton.fontColor}`,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
      },
      // backgroundColor: colors.loginButton.default,
      // color: colors.loginButton.fontColor,
      // "&:hover": {
      //   backgroundColor: colors.loginButton.hovered
      // }
    },
    signUpButton: {
      // marginLeft: theme.spacing.unit * 2,
      // backgroundColor: colors.signUpButton.default,
      // color: colors.signUpButton.fontColor,
      // "&:hover": {
      //   backgroundColor: colors.signUpButton.hovered
      // }
    },
    toolbar: {
      flex: '1 0 0px',
      justifyContent: 'space-between',
    },
    name: {
      color: theme.palette.custom.logo,
      marginLeft: theme.spacing.unit,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      '& > img': {
        height: '64px',
      },
    },
    address: {
      color: theme.palette.custom.logo,
      fontWeight: 'normal',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    business: {
      color: theme.palette.custom.logo,
      marginLeft: theme.spacing.unit,
      fontWeight: 'normal',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  };
};

export default withWidth()(withStyles(styles)(PageHeader));
