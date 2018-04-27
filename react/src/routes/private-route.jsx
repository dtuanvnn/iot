import React from 'react';
import { Route,  Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import callApi from 'util/apiCaller'

const checkToken = () => {
  callApi('').then(res => {
    console.log(res)
    if (res.status !== 401) {
      return true
    } else {
      localStorage.clear()
      return false
    }
  })
}
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} 
    render={props =>
      localStorage.getItem('token') ? (
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

export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);