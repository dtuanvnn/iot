import React from 'react';
import { Route,  Redirect } from 'react-router-dom'

const checkToken = () => {
  return localStorage.getItem('token') !== null
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} 
    render={props =>
      checkToken()? (
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

export default PrivateRoute;