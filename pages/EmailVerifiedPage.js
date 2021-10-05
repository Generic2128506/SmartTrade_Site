import React from 'react';

import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Page } from '../components';

function EmailVerifiedPage() {
  function render({ isLoggedIn }) {
    return isLoggedIn ? (
      <Redirect to="/search" />
    ) : (
      <Typography variant="h6">Your email has been verified.</Typography>
    );
  }

  return <Page render={render} />;
}

export default EmailVerifiedPage;
