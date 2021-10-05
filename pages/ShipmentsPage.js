import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Page,
  ShipmentsTable,
  ShipmentsTotalTable,
  ShipmentDateDialog,
} from '../components';
import * as ordersApi from '../api/order-api';
import * as shipmentApi from '../api/shipment-api';
import { getCookie } from '../utils/cookies';
import { Redirect } from 'react-router-dom';

const ShipmentsPage = ({ classes }) => {
  const [isLoggedIn] = useState(!!getCookie('access_token'));
  const [totals, setTotals] = useState([]);
  const [shipDateItem, setShipDateItem] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [boxItems, setBoxItems] = useState([]);
  const [sortingId, setSortingId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) fetchTotals();
  }, []);

  useEffect(() => {
    if (isLoggedIn) if (sortingId) fetchBoxes(sortingId);
  }, [sortingId]);

  async function fetchTotals() {
    const result = await ordersApi.readyTotals();
    if (result.length) {
      setSortingId(result[0].sortingId);
      setTotals(result);
    } else {
      setSortingId(null);
      setTotals([]);
    }
  }

  async function fetchBoxes(sortingId) {
    const result = await ordersApi.readyBoxes(sortingId);
    setBoxes(result);
  }

  async function fetchBoxItems(boxId) {
    const result = await ordersApi.readyItems(boxId);
    setBoxItems([
      ...boxItems.filter((item) => item.boxId !== boxId),
      ...result,
    ]);
  }

  function handleRowUnfold(boxId) {
    fetchBoxItems(boxId);
  }

  async function handleSortingSelect(sortingId) {
    setSortingId(sortingId);
  }

  async function handleShipmentDateClick(totalsItem) {
    setShipDateItem(totalsItem);
  }

  async function handleShipmentDateChange(date, enabled) {
    try {
      const result = await shipmentApi.order({
        enabled,
        sortingId: shipDateItem.sortingId,
        id: shipDateItem.shipmentId,
        schedule: enabled ? date : undefined,
      });
      setTotals(
        totals.map((item) =>
          item.sortingId !== shipDateItem.sortingId
            ? item
            : {
                ...shipDateItem,
                shipmentDate: enabled ? result[0].schedule : null,
                shipmentId: enabled ? result[0].id : null,
              }
        )
      );
    } catch {
      alert('Cannot update shipment date due to the error');
    }

    setShipDateItem(null);
  }

  function handleDialogClose() {
    setShipDateItem(null);
  }

  return (
    <Page>
      {!isLoggedIn && <Redirect to="/search" />}
      <div className={classes.totalTableContainer}>
        <ShipmentsTotalTable
          data={totals}
          sortingId={sortingId}
          onSelect={handleSortingSelect}
          onShipmentDateClick={handleShipmentDateClick}
        />
      </div>
      <ShipmentsTable
        boxes={boxes}
        boxItems={boxItems}
        onUnfold={handleRowUnfold}
      />
      {!!shipDateItem && (
        <ShipmentDateDialog
          defaultDate={shipDateItem.shipmentDate}
          onSubmit={handleShipmentDateChange}
          onClose={handleDialogClose}
        />
      )}
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
  };
};

export default withStyles(styles)(ShipmentsPage);
