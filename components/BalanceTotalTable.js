import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  table: {
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
});

const BalanceTotalTable = ({ classes, data }) => {
  const currency = data.currency ? data.currency : '';
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Balance ({currency})</TableCell>
          <TableCell>Orders in Work</TableCell>
          <TableCell>Max Order</TableCell>
          <TableCell>Basket</TableCell>
          <TableCell>Pay to Basket</TableCell>
          <TableCell>To Ship</TableCell>
          <TableCell>Max Shipment</TableCell>
          <TableCell>Pay to Ship</TableCell>
          <TableCell>REFS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{data.balance}</TableCell>
          <TableCell>{data.inworkOrders}</TableCell>
          <TableCell>{data.availForOrder}</TableCell>
          <TableCell>{data.readyForOrder}</TableCell>
          <TableCell>{data.topupForOrder}</TableCell>
          <TableCell>{data.readyForShipment}</TableCell>
          <TableCell>{data.availForShipment}</TableCell>
          <TableCell>{data.topupForShipment}</TableCell>
          <TableCell>{data.topupReference}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(BalanceTotalTable);
