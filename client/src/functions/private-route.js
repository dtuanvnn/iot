import React, { Component } from 'react';
import { Route,  Redirect } from 'react-router-dom'
import authenticate from './authenticate'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} 
    render={props =>
      authenticate.state ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute;