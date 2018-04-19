import React, { Component } from 'react';
import '../css/style.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Logout extends Component {
  render() {
    return (
      <div className="logout">
        <h2 class="page-header">Account </h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange} />
          </FormGroup>
          <Button type="submit" block bsSize="large" disabled={!this.validateForm()}>Login
          </Button>
        </form>
      </div>
    )
  }
}

export default Login;