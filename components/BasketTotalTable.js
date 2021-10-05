import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const styles = (theme) => ({
  table: {
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
});

const BasketTotalTable = ({ classes, data }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Balance</TableCell>
          <TableCell>To Order</TableCell>
          <TableCell>Available</TableCell>
          <TableCell>TopUp</TableCell>
          <TableCell>Items</TableCell>
          <TableCell>Weight (kg)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{data.balance}</TableCell>
          <TableCell>{data.readyForOrder}</TableCell>
          <TableCell>{data.availForOrder}</TableCell>
          <TableCell>{data.topupForOrder}</TableCell>
          <TableCell>{data.itemsForOrder}</TableCell>
          <TableCell>{data.weightForOrder}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(BasketTotalTable);
