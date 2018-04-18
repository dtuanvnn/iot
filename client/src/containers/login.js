import React, { Component } from 'react';
import '../css/style.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import callApi from '../util/apiCaller'

import { Authenticate } from '../functions/authenticate'

class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  login = (res) => {
    if (res.status === 200) {
      this.setState({ redirectToReferrer: true })
        Authenticate.signin(() => {
        this.setState({ redirectToReferrer: true })
        console.log('OK')
      })
    }

    /* authenticate.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    }); */
  }

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    console.log(event)
    event.preventDefault()

    axios.post('http://localhost:3001/users/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function (res) {
      this.login(res)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

  redirectUser = (path) => {  
    this.props.history.push(path);
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <h2 class="page-header">Account Login</h2>
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