import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";

// @material-ui/icons
import { Face, /* Email, */ LockOutline } from "@material-ui/icons";

// core components
import { GridContainer, ItemGrid } from "components";
import LoginCard from "components/Cards/LoginCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      redirectToReferrer: false,
      username: '', 
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  login = (res) => {
    localStorage.setItem('token', res.data.token)
    this.setState({redirectToReferrer: true})
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
    console.log('state ', this.state)
    axios.post('http://localhost:3001/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(this.login)
    .catch(function (err) {
      console.log(err)
    })
    event.preventDefault();
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={12} sm={6} md={4}>
              <form onSubmit={this.handleSubmit}>
                <LoginCard
                  customCardClass={classes[this.state.cardAnimaton]}
                  headerColor="rose"
                  cardTitle="Login"
                  cardSubtitle="Or Be Classical"
                  footerAlign="center"
                  footer={
                    <Button type="submit" color="roseNoBackground" wd size="lg" disabled={!this.validateForm()}>
                      Let's Go
                    </Button>
                  }
                  content={
                    <div>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          onChange: this.handleChange,
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {/* <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      /> */}
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          onChange: this.handleChange,
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                  }
                />
              </form>
            </ItemGrid>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(loginPageStyle)(LoginPage)