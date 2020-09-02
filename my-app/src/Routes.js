import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Timer from './timer';

export default () =>
<BrowserRouter>
<Switch> 
  <UnauthenticatedRoute path="/" exact component={Timer} />
</Switch>
</BrowserRouter>;