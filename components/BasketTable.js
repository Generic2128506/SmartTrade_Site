import React, { useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import QuantityField from './QuantityField';

const RowCheckbox = ({ id, checked, onChange, className }) => {
  function handleOnChange() {
    onChange && onChange(id);
  }

  return (
    <Checkbox
      className={className}
      disableRipple
      checked={checked}
      onChange={handleOnChange}
    />
  );
};

const BasketTable = ({
  classes,
  data,
  onQuantityChange,
  onSelect,
  onSelectAll,
}) => {
  function handleQuantityChange(id, quantity) {
    onQuantityChange && onQuantityChange(id, quantity);
  }

  function handleSelectAll(event) {
    onSelectAll && onSelectAll(event.target.checked);
  }

  const currency = data.length ? data[0].curLogo : '';
  const confirmedData = useMemo(
    () => data.filter((value) => value.isConfirmed),
    [data]
  );
  const isAllConfirmed = confirmedData.length === data.length;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              className={classes.checkbox}
              disableRipple
              checked={isAllConfirmed}
              onChange={handleSelectAll}
            />
          </TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Part Number</TableCell>
          <TableCell>Price ({currency})</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total ({currency})</TableCell>
          <TableCell>Weight (kg)</TableCell>
          <TableCell>Catalog</TableCell>
          <TableCell>Sorting</TableCell>
          <TableCell>Reference</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((value) => (
          <TableRow key={value.id}>
            <TableCell padding="checkbox">
              <RowCheckbox
                id={value.id}
                className={classes.checkbox}
                checked={value.isConfirmed}
                onChange={onSelect}
              />
            </TableCell>
            <TableCell>{value.artBrand}</TableCell>
            <TableCell>{value.artNumber}</TableCell>
            <TableCell>{value.price}</TableCell>
            <TableCell>
              <QuantityField
                className={classes.quantityField}
                id={value.id}
                quantity={value.quantity}
                onChange={handleQuantityChange}
              />
            </TableCell>
            <TableCell>{value.amount}</TableCell>
            <TableCell>{value.artWeightKg}</TableCell>
            <TableCell>{value.catLogo}</TableCell>
            <TableCell>{value.dlvLogo}</TableCell>
            <TableCell>{value.custReference}</TableCell>
            <TableCell>{value.artName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const styles = (theme) => ({
  table: {
    width: '100%',
  },
  quantityField: {
    alignItems: 'center',
  },
  checkbox: {
    padding: 0,
  },
});

export default withStyles(styles)(BasketTable);
