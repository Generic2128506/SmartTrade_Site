import React from 'react';
import { withStyles } from '@material-ui/core';
import { InlineDatePicker as MuiDatePicker } from 'material-ui-pickers';
import { APP_DATE_FORMAT } from '../utils/date';

const DatePicker = ({
  classes,
  className,
  forwardedRef,
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <MuiDatePicker
      ref={forwardedRef}
      variant="outlined"
      className={className}
      label={label}
      value={value}
      format={APP_DATE_FORMAT}
      placeholder={APP_DATE_FORMAT.toLowerCase()}
      InputProps={{
        className: classes.input,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={onChange}
      disabled={rest.disabled}
      minDate={rest.minDate}
      maxDate={rest.maxDate}
    />
  );
};

const styles = (theme) => ({
  input: {},
});

export default withStyles(styles)(DatePicker);
