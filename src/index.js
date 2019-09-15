import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App";
import store from "./store";
import { base_path } from "./constants";

render(
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <Switch>

          <Route path={base_path + ":id"} component={App} />
          <Route exact path={base_path} component={App} />
        </Switch>
      </main>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
