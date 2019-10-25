import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Bob from "./containers/Bob";
import Kevin from "./containers/Kevin";
import Stuart from "./containers/Stuart";
import Cart from "./containers/Cart";
import History from "./containers/History";
import Success from "./containers/Success";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/bob" exact component={Bob} appProps={appProps} />
      <AppliedRoute path="/kevin" exact component={Kevin} appProps={appProps} />
      <AppliedRoute path="/stuart" exact component={Stuart} appProps={appProps} />
      <AppliedRoute path="/cart" exact component={Cart} appProps={appProps} />
      <AppliedRoute path="/history" exact component={History} appProps={appProps} />
      <AppliedRoute path="/success" exact component={Success} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}