import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

const ShipmentsTable = ({ classes, data }) => {
  if (!data.length) return null;
  const currency = data.length ? data[0].currency : '';

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Part Number</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Reference</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price ({currency.trim()})</TableCell>
          <TableCell>Weight (kg)</TableCell>
          <TableCell>Row ID</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((value) => (
          <TableRow key={`${value.boxId}${value.portion}`}>
            <TableCell>{value.articul}</TableCell>
            <TableCell>{value.artBrand}</TableCell>
            <TableCell>{value.artName}</TableCell>
            <TableCell>{value.custReference}</TableCell>
            <TableCell>{value.quantity}</TableCell>
            <TableCell>{value.price}</TableCell>
            <TableCell>{value.weightKg}</TableCell>
            <TableCell>{value.custRowRef}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(ShipmentsTable);
