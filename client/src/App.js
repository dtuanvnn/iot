import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch, Link } from 'react-router-dom'

import Header from './components/header'
import Sidebar from './components/sidebar'

import Login from "./containers/login";
import Dashboard from './components/dashboard'
import About from './components/about'
import UserList from './components/user-list'
import History from './components/history'

const Home = () => <div>Home</div>

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <hr/><br/>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/users' component={UserList}/>
          <Route path='/history' component={History}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    );
  }
}

export default App;
