import React, { useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as basketApi from '../api/basket-api';
import * as balanceApi from '../api/balance-api';
import { roundTo } from '../utils/math';
import { getCookie } from '../utils/cookies';

import {
  Page,
  BasketTable,
  BasketTotalTable,
  ActionsGroup,
} from '../components';

const BasketPage = ({ classes }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('access_token'));
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState({});
  const [isUpdating, setUpdating] = useState(false);

  const confirmedData = useMemo(
    () => data.filter((item) => item.isConfirmed),
    [data]
  );

  const isDisabled = isUpdating || !confirmedData.length;

  useEffect(() => {
    if (isLoggedIn) fetchAll();
  }, []);

  useEffect(() => {
    if (totalData.balance === undefined) return;
    const items = data.filter((item) => item.isConfirmed);
    const total = {
      itemsForOrder: items.length,
      readyForOrder: roundTo(items.reduce((acc, item) => acc + item.amount, 0)),
      topupForOrder: 0,
      weightForOrder: roundTo(
        items.reduce((acc, item) => acc + item.quantity * item.artWeightKg, 0),
        3
      ),
    };
    total.topupForOrder = roundTo(
      -Math.min(totalData.availForOrder - total.readyForOrder, 0)
    );

    setTotalData({ ...totalData, ...total });
  }, [data]);

  async function fetchData() {
    const result = await basketApi.select();
    setData(result);
  }

  async function fetchTotalData() {
    const balance = await balanceApi.totals();
    setTotalData(balance);
  }

  async function fetchAll() {
    await fetchTotalData();
    await fetchData();
  }

  async function confirmItems(items, isConfirmed) {
    try {
      setUpdating(true);
      await basketApi.confirm(items, isConfirmed);
      await fetchData();
      setUpdating(false);
    } catch {
      alert('Cannot select item(s) due to the error');
      setUpdating(false);
    }
  }

  async function handleTableSelect(id) {
    const selectedItem = data.find((value) => value.id === id);
    await confirmItems([selectedItem], !selectedItem.isConfirmed);
  }

  function handleTableSelectAll(selectAll) {
    confirmItems(data, selectAll);
  }

  async function handleQuantityChange(id, quantity) {
    let oldItem = null;
    let itemIndex = -1;
    try {
      setUpdating(true);
      itemIndex = data.findIndex((value) => value.id === id);
      oldItem = data[itemIndex];
      if (!itemIndex < 0) return;

      const newItem = {
        ...data[itemIndex],
        quantity,
      };

      // Apply changes in advance
      setData([
        ...data.slice(0, itemIndex),
        newItem,
        ...data.slice(itemIndex + 1),
      ]);

      await basketApi.addUpdate([newItem]);
      setUpdating(false);
    } catch (e) {
      alert('Cannot change quantity due to the error');

      // Revert changes
      if (itemIndex >= 0)
        setData([
          ...data.slice(0, itemIndex),
          oldItem,
          ...data.slice(itemIndex + 1),
        ]);

      setUpdating(false);
    }
    try {
      await fetchData();
    } catch {
      // empty
    }
  }

  async function handleOrderClick() {
    try {
      await basketApi.order();
      await fetchData();
    } catch (e) {
      alert('Cannot order selected due to the error');
    }
  }

  async function handleDeleteClick() {
    try {
      await basketApi.delete_(confirmedData);
      await fetchData();
    } catch (err) {
      alert('Cannot delete selected due to the error');
    }
  }

  return (
    <Page>
      <div className={classes.totalTableContainer}>
        <BasketTotalTable data={totalData} />
      </div>
      <ActionsGroup>
        <Button
          className={classes.orderButton}
          variant="contained"
          color="primary"
          disabled={isDisabled}
          onClick={handleOrderClick}
        >
          Order Selected
        </Button>
        <Button
          className={classes.deleteButton}
          variant="contained"
          disabled={isDisabled}
          onClick={handleDeleteClick}
        >
          Delete Selected
        </Button>
      </ActionsGroup>
      <div className={classes.tableContainer}>
        <BasketTable
          data={data}
          onQuantityChange={handleQuantityChange}
          onSelect={handleTableSelect}
          onSelectAll={handleTableSelectAll}
        />
      </div>
    </Page>
  );
};

const styles = (theme) => {
  return {
    totalTableContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
    },
    tableContainer: theme.tableContainer,
    buttonsContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
    },
    orderButton: {
      marginRight: theme.spacing.unit,
    },
    deleteButton: {},
  };
};

export default withStyles(styles)(BasketPage);
