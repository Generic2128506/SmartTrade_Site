import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

class PageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: window.location.pathname,
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { classes, width, isLoggedIn } = this.props;
    const isScrollable = isWidthDown('sm', width);
    return (
      <div className={classes.container}>
        <Tabs
          value={this.state.currentTab}
          onChange={this.handleChange}
          variant={isScrollable ? 'scrollable' : 'standard'}
        >
          <Tab
            className={classes.tab}
            classes={{ selected: classes.tabSelected }}
            value={'/search'}
            label="Search"
            to="/search"
            component={Link}
          />
          <Tab
            className={classes.tab}
            classes={{ selected: classes.tabSelected }}
            value={'/basket'}
            label="Cart"
            to="/basket"
            component={Link}
          />
          <Tab
            className={classes.tab}
            classes={{ selected: classes.tabSelected }}
            disabled={!isLoggedIn}
            value={'/orders'}
            label="Orders"
            to="/orders"
            component={Link}
          />
          <Tab
            className={classes.tab}
            classes={{ selected: classes.tabSelected }}
            disabled={!isLoggedIn}
            value={'/shipments'}
            label="Shipments"
            to="/shipments"
            component={Link}
          />
          <Tab
            className={classes.tab}
            classes={{ selected: classes.tabSelected }}
            disabled={!isLoggedIn}
            value={'/balance'}
            label="Balance"
            to="/balance"
            component={Link}
          />
        </Tabs>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          href="mailto: robot.orders@partsonline.ae"
        >
          Contact Us
        </Button>
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'baseline',
    backgroundColor: theme.palette.custom.pageTabs.tab,
    color: '#fff',
    position: 'relative',
    justifyContent: 'center',
    marginTop: '2px',
    [theme.breakpoints.down('sm')]: {},
  },
  button: {
    position: 'absolute',
    top: '9px',
    right: '24px',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tab: {
    opacity: 1,
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    '&:last-child': {
      borderRight: 'none',
    },
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  tabSelected: {
    backgroundColor: theme.palette.custom.pageTabs.tabSelected,
    color: '#fff',
  },
});

export default withWidth()(withStyles(styles)(PageTabs));
