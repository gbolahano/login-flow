import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Items from "./components/Items";
import RequestReset from "./components/RequestReset";
import ResetPassword from './components/ResetPassword';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/items" exact component={Items} />
        <Route path="/reset/password" exact component={RequestReset} />
        <Route path="/reset" exact component={ResetPassword} />

      </Switch>
    </Fragment>
  );
};

export default Routes;
