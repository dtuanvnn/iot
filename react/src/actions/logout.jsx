import axios from 'axios'

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
export const FAILED_LOGOUT = 'FAILED_LOGOUT'

export const requestLogout = () => ({
  type: REQUEST_LOGOUT
})
export const receiveLogout = (message) => ({
  type: RECEIVE_LOGOUT,
  message: message,
  receiveAt: Date.now()
})
export const failedLogout = (message) => ({
  type: FAILED_LOGOUT,
  message: message,
  receiveAt: Date.now()
})
export const fetchLogout = () => dispatch => {
  dispatch(requestLogout())
  return axios.post('http://27.72.145.192:3001/logout')
  .then(
    res => 
    dispatch(receiveLogout(res.message)))
  .catch(function (err) {
    console.log(err)
    dispatch(failedLogout(err.message))
  })
}