import React, { useRef, useCallback } from 'react';
import moment from 'moment';
import { Button, withStyles } from '@material-ui/core';
import DatePicker from './DatePicker';
import { APP_DATE_FORMAT } from '../utils/date';

const ButtonDatePicker = ({
  classes,
  className,
  placeholder,
  value,
  ...rest
}) => {
  const pickerRef = useRef(null);

  const openPicker = useCallback(
    (e) => {
      if (pickerRef.current) {
        pickerRef.current.open(e);
      }
    },
    [pickerRef.current]
  );
  const momentDate =
    typeof value === 'string' ? moment(value, APP_DATE_FORMAT) : value;
  return (
    <>
      <Button className={className} onClick={openPicker}>
        {value || placeholder}
      </Button>
      <DatePicker
        forwardedRef={pickerRef}
        className={classes.input}
        value={momentDate}
        {...rest}
      />
    </>
  );
};

const styles = (theme) => ({
  input: {
    display: 'none',
  },
});

export default withStyles(styles)(ButtonDatePicker);
