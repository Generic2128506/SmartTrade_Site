import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

const SelectFine = ({
  classes,
  className,
  inputClasses,
  items,
  value,
  onChange,
}) => {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <MuiSelect
      value={value}
      onChange={handleChange}
      classes={{
        select: classes.select,
      }}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.title}
        </MenuItem>
      ))}
    </MuiSelect>

  );
};

const styles = (theme) => ({
  input: {
    backgroundColor: '#fff',
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  inputMarginDense: {
    paddingLeft: theme.spacing.halfUnit,
    paddingTop: theme.spacing.halfUnit,
    paddingBottom: theme.spacing.halfUnit,
  },
});

export default withStyles(styles)(SelectFine);
