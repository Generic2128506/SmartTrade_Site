import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as orderApi from '../api/order-api';
import { getCookie } from '../utils/cookies';
import {
  Page,
  OrdersTable,
  ActionsGroup,
  SearchInputWithSelect,
} from '../components';
import { Redirect } from 'react-router-dom';

const filterTypes = [
  { title: 'by part number', value: 1 },
  { title: 'by order number', value: 2 },
  { title: 'by reference', value: 3 },
];

const OrdersPage = ({ classes }) => {
  const [isLoggedIn] = useState(!!getCookie('access_token'));
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState(filterTypes[0].value);
  const [filter, setFilter] = useState('');

  async function fetchData(query) {
    const result = await orderApi.states(query);
    setData(result);
  }

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, []);

  function handleSearchTypeChange(value) {
    setFilterType(value);
  }

  function handleFilterChange(value) {
    setFilter(value.trim().toLowerCase());
  }

  function handleSearch() {
    setData([]);
    const query = {};
    if (filter)
      switch (filterType) {
        case 1:
          query.articul = filter;
          break;
        case 2:
          query.orderId = filter;
          break;
        case 3:
          query.custReference = filter;
          break;
      }
    fetchData(query);
  }

  function handleAllClick() {
    setFilter('');
    setData([]);
    fetchData();
  }

  return (
    <Page>
      {!isLoggedIn && <Redirect to="/search" />}
      <ActionsGroup>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleAllClick}
        >
          All
        </Button>
        <SearchInputWithSelect
          className={classes.searchInput}
          selectItems={filterTypes}
          selectValue={filterType}
          searchValue={filter}
          onSelectChange={handleSearchTypeChange}
          onSearchClick={handleSearch}
          onSearchChange={handleFilterChange}
        />
      </ActionsGroup>
      <div className={classes.tableContainer}>
        <OrdersTable data={data} />
      </div>
    </Page>
  );
};

const styles = (theme) => {
  return {
    tableContainer: theme.tableContainer,
    button: {},
    searchInput: {
      marginLeft: theme.spacing.unit,
    },
  };
};

export default withStyles(styles)(OrdersPage);
