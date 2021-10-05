import React from 'react';
import { Typography, withStyles, withTheme } from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import { TextField } from './index';

const RangeField = ({
  classes,
  theme,
  disabled,
  label,
  defaultValue,
  value,
  onChange,
}) => {
  disabled = value.length ? disabled : true;
  const min = value.length ? value[0] : '';
  const max = value.length ? value[1] : '';

  function handleSliderChange(value) {
    onChange(value);
  }

  return (
    <div className={classes.container}>
      <Typography variant="caption">{label}</Typography>
      <div className={classes.textFields}>
        <TextField
          className={classes.textField}
          disabled={disabled}
          value={min}
        />
        <TextField
          className={classes.textField}
          disabled={disabled}
          value={max}
        />
      </div>
      <Slider
        key={defaultValue.join()}
        min={defaultValue[0]}
        max={defaultValue[1]}
        defaultValue={defaultValue}
        disabled={disabled}
        color={theme.palette.custom.rangeSliderColor}
        onChange={handleSliderChange}
        range
      />
    </div>
  );
};

const styles = (theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  textFields: {
    display: 'flex',
  },
  textField: {
    '&:first-child': {
      marginRight: theme.spacing.unit,
    },
    flex: '1 0 0px',
  },
});

RangeField.defaultProps = {
  defaultValue: [],
  value: [],
};

export default withTheme()(withStyles(styles)(RangeField));
