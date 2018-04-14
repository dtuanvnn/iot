import React from 'react';
import { withRouter } from 'react-router-dom'
import authenticate from './authenticate'

const AuthButton = withRouter(
  ({ history }) =>
  authenticate.state ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            authenticate.signout(() => history.push("/"));
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