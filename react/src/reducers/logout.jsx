import {
  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,
  FAILED_LOGOUT
} from "actions/logout.jsx"

export const loggedOut = ( state = {
  isFetching: false,
  message: '',
  lastLoggedOut: null
}, action) => {
  switch (action.type) {
    case REQUEST_LOGOUT:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isFetching: false,
        message: action.message,
        type: RECEIVE_LOGOUT,
        lastLoggedOut: action.receiveAt
      }
    case FAILED_LOGOUT:
      return {
        ...state,
        isFetching: false,
        message: action.message,
        type: FAILED_LOGOUT
      }
    default:
      return state
  }
}