import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as userApi from '../api/user-api';
import { getCookie } from '../utils/cookies';
import {
  PageHeader,
  PageTabs,
  PageContent,
  PageFooter,
  LoginDialog,
  SignUpDialog,
} from '../components';

const Page = ({ classes, children, render }) => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('access_token'));
  const [loginError, setLoginError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [passResetError, setPassResetError] = useState('');
  const [isPasswordReset, setPasswordReset] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    const checkLogin = setInterval(
      () =>
        isLoggedIn !== !!getCookie('access_token') &&
        setIsLoggedIn(!isLoggedIn),
      500
    );

    return () => clearInterval(checkLogin);
  }, [isLoggedIn]);

  function handleLoginDialogClose() {
    setLoginDialogOpen(false);
  }

  function handleLoginDialogOpen() {
    setLoginDialogOpen(true);
  }

  async function handleLogin(email, password) {
    try {
      setSubmitting(true);
      await userApi.login(email, password);
      setLoginDialogOpen(false);
      setSubmitting(false);
    } catch (error) {
      setLoginError(error.message);
      setSubmitting(false);
    }
  }

  async function handleSignUp(user) {
    try {
      setSubmitting(true);
      await userApi.signUp(user);
      setSignUpDialogOpen(false);
      setSubmitting(false);
    } catch (error) {
      setSignUpError(error.message);
      setSubmitting(false);
    }
  }

  function handleSignUpDialogClose() {
    setSignUpDialogOpen(false);
  }

  function handleSignUpDialogOpen() {
    setSignUpDialogOpen(true);
  }

  async function handleLogout() {
    try {
      await userApi.logout();
    } catch (error) {
      // empty
    }
  }

  async function handlePasswordReset(email) {
    try {
      await userApi.reset(email);
      setPasswordReset(true);
    } catch (err) {
      setPassResetError(err.message);
    }
  }

  return (
    <div className={classes.page}>
      <PageHeader
        companyName={window.COMPANY_NAME}
        companyAddress={window.COMPANY_ADDRESS}
        isLoggedIn={isLoggedIn}
        onLogin={handleLoginDialogOpen}
        onSignUp={handleSignUpDialogOpen}
        onLogout={handleLogout}
      />
      <PageTabs isLoggedIn={isLoggedIn} />
      <PageContent>{render ? render({ isLoggedIn }) : children}</PageContent>
      <PageFooter />
      {isLoginDialogOpen && (
        <LoginDialog
          error={loginError || passResetError}
          isSubmitting={isSubmitting}
          isPasswordReset={isPasswordReset}
          onClose={handleLoginDialogClose}
          onLogin={handleLogin}
          onPasswordReset={handlePasswordReset}
        />
      )}
      {isSignUpDialogOpen && (
        <SignUpDialog
          error={signUpError}
          isSubmitting={isSubmitting}
          onClose={handleSignUpDialogClose}
          onSubmit={handleSignUp}
        />
      )}
    </div>
  );
};

const styles = (theme) => ({
  page: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '1280px',
    },
  },
});

export default withStyles(styles)(Page);
