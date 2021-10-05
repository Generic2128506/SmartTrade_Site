import React from 'react';
import {} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RangeField, TextField } from './index';

const SearchFilter = ({ classes, filter, onFilterChange, disabled }) => {
  function handleCatalogChange(event) {
    const { value } = event.target;
    onFilterChange({ ...filter, catLogo: value });
  }

  function handleRangeFieldChange(name, value) {
    onFilterChange({ ...filter, [name]: value });
  }

  function handlePriceChange(value) {
    handleRangeFieldChange('price', value);
  }

  function handleDeliveryTimeChange(value) {
    handleRangeFieldChange('dlvDays', value);
  }

  function handleAvailabilityChange(value) {
    handleRangeFieldChange('available', value);
  }

  return (
    <div className={classes.container}>
      <TextField
        className={classes.field}
        label="Catalog"
        disabled={disabled}
        onChange={handleCatalogChange}
      />
      <RangeField
        label="Price"
        disabled={disabled}
        defaultValue={filter.priceMinMax}
        value={filter.price}
        onChange={handlePriceChange}
      />
      <RangeField
        label="Days"
        disabled={disabled}
        defaultValue={filter.dlvDaysMinMax}
        value={filter.dlvDays}
        onChange={handleDeliveryTimeChange}
      />
      <RangeField
        label="Available"
        disabled={disabled}
        defaultValue={filter.availableMinMax}
        value={filter.available}
        onChange={handleAvailabilityChange}
      />
    </div>
  );
};

const styles = (theme) => {
  const colors = theme.palette.custom.searchPage;
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '150px',
      width: '250px',
      marginLeft: '24px',
      backgroundColor: colors.filterBackground,
      padding: 24,
    },
    field: {
      marginBottom: 20,
    },
  };
};

export default withStyles(styles)(SearchFilter);
