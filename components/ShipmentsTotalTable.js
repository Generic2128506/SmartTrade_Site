import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import moment from 'moment';
import { APP_DATE_FORMAT } from '../utils/date';

function ShipmentsTotalTable({
  classes,
  data,
  sortingId,
  onSelect,
  onShipmentDateClick,
}) {
  const currency = data.length ? data[0].currency : '';

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Sorting</TableCell>
            <TableCell>Places</TableCell>
            <TableCell>Weight (kg)</TableCell>
            <TableCell>Volume (㎥)</TableCell>
            <TableCell>Volume (kg)</TableCell>
            <TableCell>Amount ({currency.trim()})</TableCell>
            <TableCell>Shipment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value) => (
            <TableRow
              key={value.sortingId}
              className={
                sortingId === value.sortingId
                  ? classes.selectedRow
                  : classes.row
              }
              onClick={onSelect.bind(null, value.sortingId)}
            >
              <TableCell>{value.sortingId}</TableCell>
              <TableCell>{value.places}</TableCell>
              <TableCell>{value.weightKg}</TableCell>
              <TableCell>{value.volumeK3}</TableCell>
              <TableCell>{value.volumeKg}</TableCell>
              <TableCell>{value.amount}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="default"
                  onClick={onShipmentDateClick.bind(null, value)}
                  size="small"
                >
                  {value.shipmentDate
                    ? moment(value.shipmentDate).format(APP_DATE_FORMAT)
                    : 'Select Date'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const styles = (theme) => {
  const colors = theme.palette.custom.shipmentsPage;
  return {
    table: {
      [theme.breakpoints.up('sm')]: { width: '80%' },
    },
    selectedRow: {
      backgroundColor: colors.table.selectedRow,
      cursor: 'initial',
    },
    row: {
      cursor: 'pointer',
    },
    button: {},
  };
};

export default withStyles(styles)(ShipmentsTotalTable);
