import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from "actions/login.jsx"

export const loggedIn = (state = {
  isFetching: false,
  token: '',
  userId: null,
  admin: 0,
  username: '',
  lastLoggedIn: null
}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_LOGIN:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        userId: action.userId,
        admin: action.admin,
        lastLoggedIn: action.receiveAt,
        username: action.username
      }
    default:
      return state
  }
}