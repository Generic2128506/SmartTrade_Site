import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  withStyles,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const BalanceTopupDialog = ({ classes, open, onClose, balanceData }) => {
  var error = '';

  const [userData, setUserData] = useState({
    amount: '0',
    currency: 'AED',
    amountLabel: 'AMOUNT IN AED',
  });

  function handleFieldChange(event) {
    const { target } = event;
    setUserData({ ...userData, [target.name]: target.value });
  }

  function handleTopup() {
    if (!userData.amount || isNaN(userData.amount) || userData.amount <= 0) {
      error = 'Wrong topup amount';
      return;
    }

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/topup.php');

    var i = document.createElement('input');
    i.type = 'hidden';
    i.name = 'payer';
    i.value = balanceData.topupId;
    form.appendChild(i);

    i = document.createElement('input');
    i.type = 'hidden';
    i.name = 'amount';
    i.value = userData.amount;
    form.appendChild(i);

    i = document.createElement('input');
    i.type = 'hidden';
    i.name = 'currency';
    i.value = userData.currency;
    form.appendChild(i);

    document.body.appendChild(form);
    form.submit();

    return;
  }

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <form>
          <TextField
            name="amount"
            type="amount"
            placeholder={userData.amountLabel}
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleFieldChange}
          />
        </form>

        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={handleTopup}
        >
          TOP UP
        </Button>
      </DialogContent>
    </Dialog>
  );
};

BalanceTopupDialog.defaultProps = {
  open: true,
};

const styles = (theme) => {
  const colors = theme.palette.custom.loginDialog;
  return {
    dialog: {
      backgroundColor: colors.dialog,
    },
    button: {
      marginTop: theme.spacing.unit,
      width: '100%',
    },
    textField: {
      backgroundColor: colors.textField.background,
    },
    errorChip: {
      color: colors.forgotPassword.color,
      width: '100%',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing.unit * 2,
    },
  };
};

export default withStyles(styles)(BalanceTopupDialog);
