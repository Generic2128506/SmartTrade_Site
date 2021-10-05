import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import excelLogo from '../assets/excel-logo.svg';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const BalanceTable = ({
  classes,
  columns,
  data,
  originalData,
  onInvoiceExport,
}) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.name}>{col.name}</TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>{cell}</TableCell>
            ))}
            <TableCell>
              {row.reference === 'invoice' && (
                <Button
                  className={classes.excelButton}
                  size="small"
                  variant="contained"
                  onClick={onInvoiceExport.bind(null, originalData[i])}
                >
                  <img className={classes.excelLogo} alt="" src={excelLogo} />
                  Export
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const styles = (theme) => {
  const colors = theme.palette.custom.balancePage;

  return {
    table: {
      width: '100%',
    },
    excelButton: {
      backgroundColor: colors.excelButton.default,
      color: colors.excelButton.fontColor,
      '&:hover': {
        backgroundColor: colors.excelButton.hovered,
      },
    },
    excelLogo: {
      width: '20px',
      height: '20px',
      marginRight: theme.spacing.unit,
    },
  };
};

export default withStyles(styles)(BalanceTable);
