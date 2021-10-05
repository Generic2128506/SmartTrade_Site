import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { saveExcel } from '../utils/excel';
import { Button } from '@material-ui/core';
import {
  Page,
  BalanceTable,
  BalanceTotalTable,
  ActionsGroup,
  DatePicker,
  BalanceTransferDialog,
  BalanceTopupDialog,
} from '../components';
import * as invoiceApi from '../api/invoice-api';
import * as balanceApi from '../api/balance-api';
import { APP_DATE_FORMAT, SERVER_DATE_FORMAT } from '../utils/date';
import { getCookie } from '../utils/cookies';
import { Redirect } from 'react-router-dom';

const BalancePage = ({ classes }) => {
  const [data, setData] = useState([]);
  const [balanceData, setBalanceData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isBalTransDlgOpen, setBalTransDlgOpen] = useState(false);
  const [isBalTopupDlgOpen, setBalTopupDlgOpen] = useState(false);
  const [isLoggedIn] = useState(!!getCookie('access_token'));

  const currency = data.length ? data[0].curLogo.trim() : '';

  const columns = useMemo(
    () => [
      { name: 'Date', width: 10 },
      { name: 'Document', width: 10 },
      { name: 'Reference' },
      { name: `Debit (${currency})`, width: 12 },
      { name: `Credit (${currency})`, width: 12 },
      { name: 'Weight (kg)', width: 11 },
      { name: 'Volume (kg)', width: 11 },
    ],
    [currency]
  );

  const outputData = useMemo(
    () =>
      data.map((value) => [
        moment(value.aDate).format(APP_DATE_FORMAT),
        value.reference,
        value.aNumber,
        value.debet,
        value.credit,
        value.grossKG,
        value.volumeKG,
      ]),
    [data]
  );

  async function fetchData() {
    const result = await invoiceApi.invoices({
      fromDate: startDate ? startDate.format(SERVER_DATE_FORMAT) : null,
      tillDate: endDate ? endDate.format(SERVER_DATE_FORMAT) : null,
    });
    setData(result);
  }

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, []);

  async function fetchBalanceData() {
    const result = await balanceApi.totals();
    setBalanceData(result);
  }

  useEffect(() => {
    if (isLoggedIn) fetchBalanceData();
  }, []);

  function handleBalanceExport() {
    saveExcel('Balance', columns, outputData);
  }

  async function handleInvoiceExport(invoice) {
    try {
      const details = await invoiceApi.invoiceDetails(invoice.id);
      if (!details.length) return;
      const columns = Object.keys(details[0]).map((key) => ({
        name: key,
      }));
      const data = details.map((item) => Object.values(item));

      saveExcel(`Invoice_${invoice.aNumber}`, columns, data);
    } catch {
      alert('Cannot export invoice due to the error');
    }
  }

  function handleFilterData() {
    fetchData();
  }

  function toggleBalTransDlg() {
    setBalTransDlgOpen(!isBalTransDlgOpen);
  }

  function toggleBalTopupDlg() {
    setBalTopupDlgOpen(!isBalTopupDlgOpen);
  }

  return (
    <Page>
      {!isLoggedIn && <Redirect to="/search" />}
      <div className={classes.centerContainer}>
        <BalanceTotalTable data={balanceData} />
      </div>
      <ActionsGroup className={classes.actionsGroup}>
        <div className={classes.balanceActionsLeft}>
          <DatePicker
            className={classes.datePicker}
            classes={{
              input: classes.datePickerInput,
            }}
            label="Start Date"
            value={startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={setStartDate}
          />
          <DatePicker
            className={classes.datePicker}
            classes={{
              input: classes.datePickerInput,
            }}
            label="End Date"
            value={endDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={setEndDate}
          />
          <Button
            variant="contained"
            className={classes.showButton}
            onClick={handleFilterData}
          >
            Show
          </Button>
          <Button
            variant="contained"
            className={classes.exportButton}
            onClick={handleBalanceExport}
          >
            Export
          </Button>
        </div>
        {balanceData && balanceData.topupId && (
          <Button
            variant="contained"
            color="primary"
            className={classes.topUpBalanceButton}
            onClick={toggleBalTopupDlg}
          >
            TopUp Online
          </Button>
        )}
        <Button
          variant="contained"
          className={classes.bankTransferButton}
          onClick={toggleBalTransDlg}
        >
          Bank Transfer
        </Button>
      </ActionsGroup>
      <div className={classes.tableContainer}>
        <BalanceTable
          columns={columns}
          data={outputData}
          originalData={data}
          onInvoiceExport={handleInvoiceExport}
        />
      </div>
      <BalanceTransferDialog
        open={isBalTransDlgOpen}
        onClose={toggleBalTransDlg}
      />
      <BalanceTopupDialog
        open={isBalTopupDlgOpen}
        onClose={toggleBalTopupDlg}
        balanceData={balanceData}
      />
    </Page>
  );
};

const styles = (theme) => {
  const colors = theme.palette.custom.balancePage;
  const balanceActionsItem = {
    marginRight: theme.spacing.unit,
  };
  return {
    actionsGroup: {
      justifyContent: 'flex-end',
    },
    centerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
    },
    buttonsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
    },
    balanceActionsLeft: {
      flex: '1 0 0px',
      display: 'flex',
      alignItems: 'center',
    },
    balanceActionsRight: {
      flex: '1 0 0px',
      display: 'flex',
      justifyContent: 'flex-end',
      height: '36px',
    },
    balanceActionsItem,
    datePicker: {
      ...balanceActionsItem,
      maxWidth: '130px',
    },
    datePickerInput: {
      height: '36px',
    },
    showButton: {
      marginRight: theme.spacing.unit,
    },
    topUpBalanceButton: {
      ...balanceActionsItem,
      marginRight: theme.spacing.unit,
    },
    bankTransferButton: {
      ...balanceActionsItem,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    exportButton: {},
    tableContainer: theme.tableContainer,
  };
};

export default withStyles(styles)(BalancePage);
