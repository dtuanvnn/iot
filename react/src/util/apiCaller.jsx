import fetch from 'isomorphic-fetch';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:3001`) :
  'http://localhost:3001';

export default function callApi(endpoint, method = 'get', body) {
  var token = 'Bearer ' + localStorage.getItem('token')
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 
      'content-type': 'application/json',
      'Authorization': token
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => {
    console.log(response)
    if (response.status === 401) {
      localStorage.clear()
      return Promise.reject(response)
    }

    response.json().then(json => 
      ({ json, response })
    )
  })
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
