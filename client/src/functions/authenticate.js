import React, { Component } from 'react';

export class Authenticate extends Component {
  state = {
    isAuthenticated: false
  }

  signin(cb) {
      this.setState({isAuthenticated: true})
    setTimeout(cb, 100); // fake async
  }

  signout(cb) {
    this.setState({isAuthenticated: false})
      setTimeout(cb, 100)
  }
}

export function isLoggedIn() {
  return Authenticate.state;
}