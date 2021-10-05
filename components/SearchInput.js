import React from 'react';
import classNames from 'classnames';
import { withStyles, OutlinedInput } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ classes, className, value, onChange, onSearch }) => {
  function handleChange(event) {
    const { value } = event.target;
    onChange && onChange(value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') handleSearchClick();
  }

  function handleSearchClick() {
    onSearch && onSearch();
  }

  return (
    <OutlinedInput
      className={classNames(classes.input, className)}
      autoComplete="on"
      value={value}
      placeholder="Search..."
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleSearchClick}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

const styles = (theme) => {
  const { backgroundColor } = theme.palette.custom.searchInput;
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2px 4px',

      backgroundColor,
    },
    input: {
      width: '400px',
      height: '36px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor,
    },
  };
};

export default withStyles(styles)(SearchInput);
