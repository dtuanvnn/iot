import { combineReducers } from "redux"

import { loggedIn } from "./login.jsx"
import { loggedOut } from "./logout.jsx"

const appReducer = combineReducers({
  loggedIn,
  loggedOut
})
const rootReducer = (state, action) => {
  if (action.type === 'RECEIVE_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer