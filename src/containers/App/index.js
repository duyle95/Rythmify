import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import thunk from "redux-thunk";

import reducers from "../../modular";
import { axiosApiMiddleware } from "../../services/axios";
import history from "../../services/history";

import AppView from "../AppView";
import Login from "../Login";
import Callback from "../Callback";

const middlewares = [thunk, axiosApiMiddleware];

const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(
  createStore
);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/callback" component={Callback} />
            <Route path="/" component={AppView} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
