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
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/bob" exact component={Bob} appProps={appProps} />
      <AppliedRoute path="/kevin" exact component={Kevin} appProps={appProps} />
      <AppliedRoute path="/stuart" exact component={Stuart} appProps={appProps} />
      <AuthenticatedRoute path="/cart" exact component={Cart} appProps={appProps} />
      <AuthenticatedRoute path="/history" exact component={History} appProps={appProps} />
      <AppliedRoute path="/success" exact component={Success} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}