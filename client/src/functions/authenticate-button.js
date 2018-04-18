import React from 'react';
import { withRouter } from 'react-router-dom'
import { isLoggedIn, Authenticate } from './authenticate'

const AuthButton = withRouter(
  ({ history }) =>
  isLoggedIn() ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            Authenticate.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

export default AuthButton;