import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Select, SearchInput } from './index';

const SearchInputWithSelect = ({
  classes,
  className,
  selectItems,
  selectValue,
  searchValue,
  onSelectChange,
  onSearchChange,
  onSearchClick,
}) => {
  return (
    <div className={classNames(classes.container, className)}>
      <Select
        className={classes.select}
        items={selectItems}
        value={selectValue}
        onChange={onSelectChange}
      />
      <SearchInput
        className={classes.searchInput}
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearchClick}
      />
    </div>
  );
};

const styles = (theme) => {
  return {
    container: {
      display: 'flex',
    },
    select: {
      marginRight: theme.spacing.unit,
    },
    searchInput: {
      width: 'initial',
    },
  };
};

export default withStyles(styles)(SearchInputWithSelect);
