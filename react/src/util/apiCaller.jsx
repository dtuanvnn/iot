import fetch from 'isomorphic-fetch';
import { connect } from "react-redux"

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://27.72.145.192:3001`) :
  'http://27.72.145.192:3001';


 export const API = (endpoint, token, method = 'get', body) => {
  let tokens = 'Bearer ' + token
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      'authorization': tokens
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => 
    /* if (!response.ok) {
      localStorage.clear()
    } */
    response.json().then(json => 
      ({ json, response })
    )
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}