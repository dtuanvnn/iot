import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import PrivateRoute from '../functions/private-route'

import Login from "../containers/login";
import Dashboard from './dashboard'
import About from './about'
import UserList from './user-list'
import History from './history'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <Route path='/users' component={UserList}/>
        <Route path='/history' component={History}/>
        <Route path='/about' component={About}/>
      </Switch>
    );
  }
}



export default Main;
