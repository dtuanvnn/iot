import axios from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

export const requestLogin = (username) => ({
  type: REQUEST_LOGIN,
  username
})
export const receiveLogin = (username, user) => ({
  type: RECEIVE_LOGIN,
  username,
  token: user.token,
  userId: user.userid,
  receiveAt: Date.now()
})
export const fetchLogin = login => dispatch => {
  dispatch(requestLogin(login.username))
  return axios.post('/login', {
    username: login.username,
    password: login.password
  })
  .then(
    res => 
    dispatch(receiveLogin(login.username, res.data)))
  .catch(function (err) {
    console.log(err)
  })
}
const shouldFetchLogin = (state, login) => {
  const isLoggedIn = state.token
  if (!isLoggedIn) {
    return true
  }
  return false
}
export const fetchLoginIfNeeded = login => (dispatch, getState) => {
  if (shouldFetchLogin(getState(), login)) {
    return dispatch(fetchLogin(login))
  }
}