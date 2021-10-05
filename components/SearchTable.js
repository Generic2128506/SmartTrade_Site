import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Rating from 'material-ui-rating';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';
import QuantityField from './QuantityField';

const SearchTable = ({
  classes,
  data,
  showReference,
  onDataChange,
  isLoggedIn,
}) => {
  function handleQuantityChange(id, quantity) {
    const newData = data.map((value) =>
      value.id !== id
        ? value
        : {
            ...value,
            quantity,
          }
    );
    onDataChange && onDataChange(newData);
  }

  const currency = data.length ? data[0].curLogo : '';
  return (
    <div className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Part Number</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>
              <div>Delivery</div>
              <div>Days</div>
            </TableCell>
            <TableCell>Price ({currency})</TableCell>
            {isLoggedIn && <TableCell>Quantity</TableCell>}
            <TableCell>Available</TableCell>
            <TableCell className={classes.ratingCell}>Rating</TableCell>
            <TableCell className={classes.weightCell}>
              <div>Weight (kg)</div>
              <div>Volume (kg)</div>
            </TableCell>
            {showReference && <TableCell>Reference</TableCell>}
            <TableCell>Catalog</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value) => (
            <TableRow key={value.id}>
              <TableCell>{value.artNumber}</TableCell>
              <TableCell>{value.artBrand}</TableCell>
              <TableCell>{value.artName}</TableCell>
              <TableCell>
                <div className={classes.pointValue}>{value.dlvPoint}</div>
                <div>{value.dlvDays}</div>
              </TableCell>
              <TableCell>{value.price}</TableCell>
              {isLoggedIn && (
                <TableCell>
                  <QuantityField
                    className={classes.quantityField}
                    id={value.id}
                    quantity={value.quantity}
                    onChange={handleQuantityChange}
                  />
                </TableCell>
              )}
              <TableCell>
                {value.available
                  ? value.available
                  : value.price
                  ? 'on stock'
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <Rating
                  classes={{
                    root: classes.rating,
                    icon: classes.ratingIcon,
                    iconButton: classes.ratingIconButton,
                  }}
                  iconNormal={<StarRateIcon />}
                  iconFilled={<StarRateIcon nativeColor="#000" />}
                  value={value.statSupply / 20}
                  max={5}
                  readOnly
                />
              </TableCell>
              <TableCell>
                <div className={classes.weightValue}>{value.artWeightKg}</div>
                <div>{value.artVolumeKg}</div>
              </TableCell>
              {showReference && <TableCell>{value.custReference}</TableCell>}
              <TableCell>{value.catLogo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const styles = (theme) => {
  const colors = theme.palette.custom.searchPage;
  return {
    container: {
      flex: '1 0 0px',
    },
    weightCell: {
      whiteSpace: 'nowrap',
    },
    weightValue: {
      borderBottom: `1px solid ${colors.weightValueBorder}`,
    },
    pointValue: {
      borderBottom: `1px solid ${colors.weightValueBorder}`,
    },
    ratingCell: {
      textAlign: 'left',
      padding: 20,
    },
    rating: {
      display: 'flex',
    },
    ratingIcon: {
      width: 20,
      height: 20,
    },
    ratingIconButton: {
      padding: 1,
    },
    quantityField: {
      alignItems: 'center',
    },
  };
};

export default withStyles(styles)(SearchTable);
