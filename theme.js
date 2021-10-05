import { createMuiTheme } from '@material-ui/core';

const brand = {
  gray: '#4a525b',
  orange: '#f79131',
  silver: '#b6b8ba',
  black11: '#e4e5e6',
  black54: '#8c8e90',
  black89: '#434345',
};

// Default theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const colors = {
  rangeSliderColor: '#005277',
  tableHeader: brand.black11,
  logo: '#085375',
  searchInput: {
    backgroundColor: '#fff',
  },
  searchInputWithSelect: {
    select: {},
  },
  searchPage: {
    tabSelectedBackground: brand.silver,
    tabBackground: brand.black11,
    filterBackground: '#F8F5F0',
    weightValueBorder: '#C4C6C8',
    ratingIconColor: '#C4C6C8',
    deliveryTermLabel: '#fff',
    uploadFileButton: {},
    downloadTemplateButton: {},
  },
  basketPage: {
    orderButton: {},
    deleteButton: {},
  },
  ordersPage: {},
  shipmentsPage: {
    table: {
      unfoldedRow: '#fff',
      selectedRow: '#fff',
    },
    shipmentDateDialog: {
      dialog: 'initial',
      textField: {
        background: 'initial',
      },
      button: {},
    },
    totalTable: {
      button: {},
    },
  },
  balancePage: {
    excelButton: {
      fontColor: '#fff',
      default: '#257247',
      hovered: '#234E45',
      focused: '#92AC90',
    },
  },
  pageHeader: {
    header: '#fff',
    loginButton: {},
    signUpButton: {},
  },
  pageTabs: {
    tab: brand.gray,
    tabSelected: brand.orange,
  },
  resetPasswordPage: {
    dialog: brand.black11,
    textField: {
      background: '#fff',
    },
  },
  loginDialog: {
    dialog: '#fff',
    textField: {
      background: '#fff',
    },
    forgotPassword: {
      color: theme.palette.text.primary,
    },
  },
  signUpDialog: {
    dialog: '#fff',
    textField: {
      background: '#fff',
    },
    errorChip: {
      color: '#fff',
    },
  },
};

const halfSpacingUnit = theme.spacing.unit / 2;

export default createMuiTheme({
  spacing: {
    halfUnit: halfSpacingUnit,
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Montserrat', 'sans-serif'],
  },
  palette: {
    background: {
      default: '#fff',
    },
    custom: { ...colors },
    primary: {
      main: brand.orange,
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: theme.shape.borderRadius / 2,
  },
  overrides: {
    MuiTableHead: {
      root: {
        background: colors.tableHeader,
      },
    },
    MuiTableRow: {
      root: {
        height: '40px',
      },
      head: {
        height: '40px',
      },
    },
    MuiTableCell: {
      root: {
        '&:last-child': {
          paddingRight: halfSpacingUnit,
        },
      },
      body: {
        fontSize: theme.typography.pxToRem(12),
      },
      paddingDense: {
        padding: halfSpacingUnit,
        paddingRight: halfSpacingUnit,
      },
      head: {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    MuiButton: {
      root: {
        whiteSpace: 'nowrap',
      },
      contained: {
        boxShadow: 'none',
        // '&$disabled': {
        //   backgroundColor: '#C4C6C8',
        //   color: '#fff',
        // },
      },
    },
    MuiTab: {
      root: {
        cursor: 'pointer',
        // [theme.breakpoints.up('md')]: {
        //   fontSize: theme.typography.pxToRem(13),
        //   minWidth: 120,
        // },
      },
    },
    MuiPrivateTabIndicator: {
      root: {
        height: 0,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#fff',
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: theme.palette.text.primary,
      },
      toolbarBtnSelected: {
        color: theme.palette.text.primary,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: theme.palette.text.primary,
      },
      dayLabel: {},
    },
    MuiPickersCalendar: {
      transitionContainer: {
        minHeight: '168px',
      },
    },
    MuiPickersDay: {
      day: {
        color: theme.palette.text.primary,
        borderRadius: 'initial',
        height: '28px',
      },
      isSelected: {
        backgroundColor: brand.orange,
      },
      current: {},
    },
    MuiCheckbox: {
      colorSecondary: {
        color: brand.gray,
        '&$checked': {
          color: brand.gray,
        },
      },
    },
  },
  props: {
    MuiTable: {
      padding: 'dense',
    },
    MuiTableCell: {
      align: 'center',
    },
    MuiTableRow: {},
    MuiInputBase: {
      margin: 'dense',
    },
  },
  tableContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    overflowX: 'auto',
  },
});
