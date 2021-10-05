import React from 'react';

import { Dialog, DialogContent, withStyles } from '@material-ui/core';

const BalanceTransferDialog = ({ classes, open, onClose }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <iframe className={classes.iframe} src="/bank-transfer.html" />
      </DialogContent>
    </Dialog>
  );
};

const styles = (theme) => {
  return {
    dialog: {
      overflowY: 'auto',
      height: '70vh',
    },

    iframe: {
      border: 0,
      width: '100%',
      height: '99%',
    },
  };
};

export default withStyles(styles)(BalanceTransferDialog);
