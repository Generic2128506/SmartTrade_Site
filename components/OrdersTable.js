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
    width: '100%',
  },
});

const OrdersTables = ({ classes, data }) => {
  const currency = data.length ? data[0].currency : '';
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Order Number</TableCell>
          <TableCell>Part Number</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Order Price ({currency.trim()})</TableCell>
          <TableCell>Sale Price ({currency.trim()})</TableCell>
          <TableCell>Ordered</TableCell>
          <TableCell>Waiting</TableCell>
          <TableCell>Purchased</TableCell>
          <TableCell>Accepted</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell>Refused</TableCell>
          <TableCell>Reference</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((value) => (
          <TableRow key={value.id}>
            <TableCell>{value.orderId}</TableCell>
            <TableCell>{value.articul}</TableCell>
            <TableCell>{value.brand}</TableCell>
            <TableCell>{value.priceOrder}</TableCell>
            <TableCell>{value.priceSale}</TableCell>
            <TableCell>{value.ordered}</TableCell>
            <TableCell>{value.inwork}</TableCell>
            <TableCell>{value.purchased}</TableCell>
            <TableCell>{value.accepted}</TableCell>
            <TableCell>{value.shipped}</TableCell>
            <TableCell>{value.refused}</TableCell>
            <TableCell>{value.custReference}</TableCell>
            <TableCell>{value.artName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

OrdersTables.defaultProps = {
  data: [],
};

export default withStyles(styles)(OrdersTables);
