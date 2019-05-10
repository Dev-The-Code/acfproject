import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./reduxStore";

//route components
import AdminLayoutContainer from "./layout/";
import DatabaseComponent from "./layout/sections/database/";
import Dashboard from "./layout/sections/dashboard";
import RootLayout from "./layout/sections/comunity-empowerment/RootLayout";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AdminLayoutContainer>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/database" component={DatabaseComponent} />
              <Route path="/comunity-empowerment/families" component={RootLayout} />
            </Switch>
          </AdminLayoutContainer>
        </BrowserRouter>
      </Provider>
    );
  }
}
