import React from 'react';
import { Route,  Redirect } from 'react-router-dom'
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} 
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: "/pages/login",
            state: { from: props.location }
          }}
        />
      )
  }
  />
)

const mapStateToProps = (state, ownProps) => {
  const { loggedIn } = state
  return {
      isLoggedIn: loggedIn.token
  };
};

export default connect(mapStateToProps)(PrivateRoute);