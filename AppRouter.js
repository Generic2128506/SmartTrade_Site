import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  BalancePage,
  BasketPage,
  EmailVerifiedPage,
  OrdersPage,
  ResetPasswordPage,
  SearchPage,
  ShipmentsPage,
  AboutPage,
  ContactPage,
} from './pages';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/basket" component={BasketPage} />
        <Route exact path="/orders" component={OrdersPage} />
        <Route exact path="/shipments" component={ShipmentsPage} />
        <Route exact path="/balance" component={BalancePage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/email-verified" component={EmailVerifiedPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contacts" component={ContactPage} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  );
}

export default AppRouter;
