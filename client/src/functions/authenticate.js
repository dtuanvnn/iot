import React, { Component } from 'react';

export default class authenticate extends Component {
    constructor(props) {
        super(props)
        this.state = false
    }

    authenticate(cb) {
        this.state = true
      setTimeout(cb, 100); // fake async
    }

    signout(cb) {
        this.state = false
        setTimeout(cb, 100)
    }
  }