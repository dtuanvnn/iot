import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import {Grid, Row, Col } from 'react-bootstrap'

import Header from './components/header'
import Sidebar from './components/sidebar'

import Login from "./containers/login";
import Dashboard from './components/dashboard'
import About from './components/about'
import UserList from './components/user-list'
import History from './components/history'

import authenticate from './functions/authenticate'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <AuthButton />
          <Grid fluid="true">
            <Row className="show-grid">
              <Col md={6} md={1} lg={1}>
                <Sidebar />
              </Col>
              <Col md={6} md={9} lg={9}>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute path='/dashboard' component={Dashboard}/>
                  <Route path='/users' component={UserList}/>
                  <Route path='/history' component={History}/>
                  <Route path='/about' component={About}/>
                </Switch>
              </Col>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

const AuthButton = withRouter(
  ({ history }) =>
  authenticate.state ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            authenticate.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticate.state ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default App;
