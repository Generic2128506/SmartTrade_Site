import React, { useEffect, useMemo, useState, useRef } from 'react';
import querystring from 'querystring';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel } from "@material-ui/core/InputLabel";
import { FormControl } from '@material-ui/core/FormControl';
import * as quotationApi from '../api/quotation-api';
import * as deliveryApi from '../api/delivery-api';
import { parseQuotationExcel } from '../utils/excel';
import { saveExcel } from '../utils/excel';
import { getCookie } from '../utils/cookies';

import { Button, Tabs, Tab, Typography } from '@material-ui/core';
import {
  Page,
  SearchInput,
  SearchTable,
  SearchFilter,
  ActionsGroup,
  Select,
  SelectFine
} from '../components';

const isBetween = (value, range) => value >= range[0] && value <= range[1];

const deliveryTermLimit = [
  { title: '1', value: 1 },
  { title: '4', value: 4 },
  { title: '7', value: 7 },
  { title: '14', value: 14 },
  { title: '30', value: 30 },
  { title: '60', value: 60 },
  { title: '180', value: 180 },
];

const SearchPage = ({ classes, history, location }) => {
  const [isLoggedIn] = useState(!!getCookie('access_token'));
  const [search, setSearch] = useState('8532126020');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    catLogo: '',
    dlvDaysMinMax: [],
    priceMinMax: [],
    availableMinMax: [],
    dlvDays: [],
    price: [],
    available: [],
  });
  const [deliveryTerm, setDeliveryTerm] = useState(4);
  const [tab, setTab] = useState(0);
  const [isFileUploading, setFileUploading] = useState(false);

  const [deliveryTariffList, setDeliveryTariffList] = useState([]);
  const [deliveryTariff, setDeliveryTariff] = useState([]);

  async function getDeliveryTariffList() {
      setDeliveryTariffList([]);
      const result = await deliveryApi.deliveries(true, false);

      setDeliveryTariffList(
        result.map((row) => ({
                  title: row['text'],
                  value: row['logo']
                  }))
      );

      if (result !==null && result.length !==0)
        setDeliveryTariff(result[0].logo);
  }


  const openFileDialog = useRef();

  const columns = useMemo(() => [
    { name: 'PartNumber', width: 10 },
    { name: 'Brand', width: 10 },
    { name: 'Quantity' },
    { name: 'Price' },
    { name: 'Reference' },
    { name: 'Catalog' },
  ]);

  const outputData = useMemo(
    () =>
      data.map((value) => [
        value.artNumber,
        value.artBrand,
        value.available,
        value.price,
        value.reference,
        value.catLogo,
      ]),
    [data]
  );

  /**
   * Searching for part number
   */
  useEffect(() => {

    getDeliveryTariffList();

    if (!location.search) {
      if (!isLoggedIn) fetchDataByDefault();
    } else {
      fetchDataBySearch();
    }
  }, [location.search]);

  async function fetchData(query, maxDays, quotationId) {
    setData([]);
    const result = await quotationApi.process(query, maxDays, quotationId);
    setData(result);

    /*
      Reset filter
    */
    resetFilter(result);
  }

  function fetchDataByDefault() {
    fetchData([], 0, -1);
  }

  function fetchDataBySearch() {
    const params = querystring.parse(location.search.slice(1));
    setSearch(params.part);
    fetchData([
        { artNumber: params.part, dlvLogo: deliveryTariff }
    ], 0, null);
  }

  function resetFilter(data) {
    const prices = data.map((item) => item.price);
    const dlvDays = data.map((item) => item.dlvDays);
    const available = data.map((item) => item.available);
    const dlvDaysMinMax = [Math.min(...dlvDays), Math.max(...dlvDays)];
    const priceMinMax = [
      Math.floor(Math.min(...prices)),
      Math.ceil(Math.max(...prices)),
    ];
    const availableMinMax = [Math.min(...available), Math.max(...available)];
    setFilter((filter) => ({
      ...filter,
      dlvDaysMinMax,
      priceMinMax,
      availableMinMax,
      dlvDays: dlvDaysMinMax,
      price: priceMinMax,
      available: availableMinMax,
    }));
  }

  function handleSearchInputChange(value) {
    setSearch(value);
  }

  function handleSearchInputSearch() {
    const params = querystring.parse(location.search.slice(1));
    if (params.part === search) fetchDataBySearch();
    else
      history.push({
        pathname: '/search',
        search: `?part=${search}`,
      });
  }

  function handleDataChange(data) {
    setData(data);
  }

  async function handleToBasket() {
    if (isLoggedIn)
      try {
        const { quotationId } = filteredData[0];
        if (quotationId && quotationId > 0) {
          await quotationApi.confirmAndToBasket(
            quotationId,
            data.filter((value) => value.quantity > 0)
          );
          setData([]);
        }
      } catch (e) {
        // empty
      }
  }

  async function handleToExcel() {
    saveExcel('Quotation', columns, outputData);
  }

  function handleFilterChange(newFilter) {
    setFilter({ ...filter, ...newFilter });
  }

  function handleTabChange(event, value) {
    setTab(value);
  }

  function handleFileOpen() {
    openFileDialog.current.click();
  }

  function handleDeliveryTermChange(value) {
    setDeliveryTerm(value);
  }

  function handleDeliveryTariffChange(value) {
      setDeliveryTariff(value);
  }

  async function handleQuotationExcel(event) {
    setFileUploading(true);
    let excelData = [];
    try {
      const file = event.target.files[0];
      event.target.value = '';
      if (!file) return;
      excelData = await parseQuotationExcel(file);
    } catch (err) {
      alert(err.message);
    }

    if (!excelData.length) {
      setFileUploading(false);
      return;
    }
    try {
      fetchData(
        excelData.map((row) => ({
          artNumber: row['PartNumber'],
          artBrand: row['Brand'],
          quantity: row['Quantity'],
          price: row['Price'],
          custReference: row['Reference'],
          catLogo: row['Catalog'],
          dlvLogo: deliveryTariff
          //          dlvLogo: row["Dispatch"],
          //          custRowRef: row["RowId"],
          //          custOrdRef: row["OrderNumber"],
          //          cffAgree: row["MaxOverPrice"],
          //          curLogo: row["Currency"],
          //          isNumber: row["OnlyArticul"],
          //          isBrand: row["OnlyBrand"],
          //          isWait: row["Wait"]
        })),
        deliveryTerm,
        null
      );

      setFileUploading(false);
    } catch (err) {
      alert('Cannot process quotation due to the error');
      setFileUploading(false);
    }
  }

  const filteredData = useMemo(
    () => data
    /*
      data.filter(item => {
        return (

          // Catalog filter
          (!filter.catLogo ||
            item.catLogo
              .toUpperCase()
              .includes(filter.catLogo.toUpperCase())) &&

          // Price filter
          (!filter.price.length || isBetween(item.price, filter.price)) &&

          // Delivery time filter
          (!filter.dlvDays.length || isBetween(item.dlvDays, filter.dlvDays)) &&

          // Availabiltiy filter
          (!filter.available.length ||
            isBetween(item.available, filter.available)) &&

          // Delivery term limit
          item.dlvDays <= deliveryTerm
        );
      })
    ,[data, filter, deliveryTerm]
    */
  );

  return (
    <Page>
      <Tabs
        className={classes.tabs}
        value={tab}
        centered
        onChange={handleTabChange}
      >
        <Tab
          label="By Part Number"
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
        />
        <Tab
          label="By Excel File"
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
        />
      </Tabs>
      {tab === 0 ? (
        <div className={classes.searchContainer}>

          <div className={classes.searchInputContainer}>
              <SearchInput
                value={search}
                onChange={handleSearchInputChange}
                onSearch={handleSearchInputSearch}
              />
          </div>

          <div className={classes.deliveryTariffContainer}>
              <SelectFine
                items={deliveryTariffList}
                value={deliveryTariff}
                onChange={handleDeliveryTariffChange}
              />
          </div>


        </div>
      ) : (
        <div className={classes.searchContainerByFile}>
          <div className={classes.deliveryTermContainer}>
              <Button
                disabled={isFileUploading}
                className={classes.uploadFileButton}
                variant="contained"
                onClick={handleFileOpen}
              >
                Upload File
              </Button>
              <input
                ref={openFileDialog}
                type="file"
                hidden
                style={{ height: 0, width: 0 }}
                accept=".xlsx"
                onChange={handleQuotationExcel}
              />

              <div className={classes.deliveryTermContainer}>
                  <Typography className={classes.deliveryTermLabel} variant="body1">
                    Max days:
                  </Typography>
                  <Select
                    items={deliveryTermLimit}
                    value={deliveryTerm}
                    onChange={handleDeliveryTermChange}
                  />
              </div>

              <div className={classes.deliveryTariffContainer}>
                <SelectFine
                  items={deliveryTariffList}
                  value={deliveryTariff}
                  onChange={handleDeliveryTariffChange}
                />
              </div>

          </div>


         <Button
            className={classes.downloadTemplateButton}
            variant="contained"
            component="a"
            href="/quote_template.xlsx"
            download
          >
            Download Template
          </Button>



        </div>
      )}
      <ActionsGroup className={classes.actionsGroup}>
        <Button
          disabled={!filteredData.length || isFileUploading || !isLoggedIn}
          className={classes.basketButton}
          variant="contained"
          color="primary"
          onClick={handleToBasket}
        >
          To Cart
        </Button>
        <Button
          disabled={!filteredData.length || isFileUploading}
          className={classes.excelButton}
          variant="contained"
          color="default"
          onClick={handleToExcel}
        >
          EXPORT
        </Button>
      </ActionsGroup>
      <div className={classes.tableContainer}>
        <SearchTable
          data={filteredData}
          showReference={tab === 1}
          onDataChange={handleDataChange}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </Page>
  );
};

/*
<SearchFilter
  filter={filter}
  disabled={!data.length}
  onFilterChange={handleFilterChange}
/>
*/

const styles = (theme) => {
  const colors = theme.palette.custom.searchPage;
  const searchContainer = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.tabSelectedBackground,
    height: '72px',
    minHeight: '72px',
    marginBottom: theme.spacing.unit,
    padding: `0 ${theme.spacing.unit}px`,
  };
  return {
    tabs: {
      minHeight: 40,
    },
    tabRoot: {
      backgroundColor: colors.tabBackground,
      opacity: 1,
      minHeight: 40,
    },
    tabSelected: {
      backgroundColor: colors.tabSelectedBackground,
      color: '#fff',
    },
    searchContainer: {
      ...searchContainer,
    },
    searchContainerByFile: {
      ...searchContainer,
      justifyContent: 'space-between',
      padding: theme.spacing.unit,
    },
    searchInputContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${theme.spacing.unit}px`,
    },
    deliveryTermContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${theme.spacing.unit}px`,
    },
    deliveryTermLabel: {
      color: colors.deliveryTermLabel,
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 2,
    },
    deliveryTariffContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 4,
    },
    deliveryTariffLabel: {
      color: colors.deliveryTermLabel,
      marginRight: theme.spacing.unit,
    },
    actionsGroup: {
      justifyContent: 'space-between',
    },
    basketButton: {},
    excelButton: {},
    tableContainer: theme.tableContainer,
    uploadFileButton: {
    },
    downloadTemplateButton: {
      marginRight: theme.spacing.unit * 2,
    },
  };
};

export default withStyles(styles)(SearchPage);
