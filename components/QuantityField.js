import React from 'react';
import { TextField } from './index';

const QuantityField = ({ id, className, quantity, onChange }) => {
  function handleChange(event) {
    const { value } = event.target;
    if (value === '0') {
      event.target.value = '';
      return;
    }
    if (!value) return;
    onChange && onChange(id, value);
  }

  function handleBlur(event) {
    event.target.value = quantity;
  }

  function handleKeyPress(event) {
    if (event.key < '0' || event.key > '9') event.preventDefault();
  }

  return (
    <TextField
      style={{ width: '3rem' }}
      className={className}
      defaultValue={quantity}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
    />
  );
};

export default QuantityField;
