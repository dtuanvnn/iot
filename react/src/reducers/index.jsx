import { combineReducers } from "redux"

import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from "actions/index.jsx"

const loggedIn = ( state = {
  isFetching: false,
  token: '',
  userId: null,
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
        lastLoggedIn: action.receiveAt
      }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  loggedIn
})

export default rootReducer