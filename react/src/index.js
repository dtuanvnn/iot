import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from 'redux-thunk'
import { HashRouter, Route, Switch } from "react-router-dom"

import "assets/css/material-dashboard-react.css?v=1.2.0"
import "assets/css/material-dashboard-pro-react.css?v=1.2.1"

import indexRoutes from "routes/index.jsx"
import rootReducer from "reducers/index.jsx"
import {loadState, saveState } from "util/localStorage.jsx"

const persistedState = loadState()
const middleware = [ thunk ]
const store = createStore(
  rootReducer, 
  persistedState,
  applyMiddleware(...middleware)
)
store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  </HashRouter>
  </Provider>,
  document.getElementById("root")
)
