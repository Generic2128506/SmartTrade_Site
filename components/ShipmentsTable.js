import React, { Fragment, useState } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { withStyles } from '@material-ui/core/styles';
import { ShipmentsBoxTable } from './index';

const styles = (theme) => {
  const colors = theme.palette.custom.shipmentsPage;

  return {
    table: {
      width: '100%',
    },
    unfoldedRow: {
      backgroundColor: colors.table.unfoldedRow,
    },
    iconButton: {
      padding: 0,
    },
  };
};

const ShipmentsTable = ({ classes, boxes, boxItems, onUnfold }) => {
  const [unfolded, setUnfolded] = useState({});

  function handleUnfold(boxId) {
    const isUnfolded = unfolded[boxId];
    setUnfolded({ ...unfolded, [boxId]: !isUnfolded });
    !isUnfolded && onUnfold && onUnfold(boxId);
  }

  const currency = boxes.length ? boxes[0].currency : '';

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Box Number</TableCell>
          <TableCell>Weight (kg)</TableCell>
          <TableCell>Length (m)</TableCell>
          <TableCell>Height (m)</TableCell>
          <TableCell>Width (m)</TableCell>
          <TableCell>Volume (kg)</TableCell>
          <TableCell>Price ({currency.trim()})</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {boxes.map((value) => (
          <Fragment key={value.boxId}>
            <TableRow
              className={unfolded[value.boxId] ? classes.unfoldedRow : ''}
            >
              <TableCell padding="checkbox">
                <IconButton
                  className={classes.iconButton}
                  onClick={handleUnfold.bind(null, value.boxId)}
                >
                  {unfolded[value.boxId] ? (
                    <IndeterminateCheckBoxOutlinedIcon />
                  ) : (
                    <AddBoxIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>{value.boxNumber}</TableCell>
              <TableCell>{value.weightKg}</TableCell>
              <TableCell>{value.lengthM}</TableCell>
              <TableCell>{value.heightM}</TableCell>
              <TableCell>{value.widthM}</TableCell>
              <TableCell>{value.volumeKg}</TableCell>
              <TableCell>{value.amount}</TableCell>
            </TableRow>
            {unfolded[value.boxId] && (
              <TableRow>
                <TableCell />
                <TableCell colSpan="7">
                  <ShipmentsBoxTable
                    data={boxItems.filter((item) => item.boxId === value.boxId)}
                  />
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(ShipmentsTable);
