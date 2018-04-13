import React, { Component } from 'react';
import style from '../../public/css/stylesheet';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="login">
        <h2 class="style.page-header">Account Login</h2>
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