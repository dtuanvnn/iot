import React, { Component } from 'react';

export function isLoggedIn() {
  return localStorage.getItem('token');
}

export default class authenticate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticalted: false
        }
    }

    signin(cb) {
        this.setState({isAuthenticalted: true})
      setTimeout(cb, 100) // fake async
    }

    signout(cb) {
        this.setState({isAuthenticalted: true})
        setTimeout(cb, 100)
    }
  }