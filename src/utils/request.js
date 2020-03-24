import axios from 'axios';

const baseURL = "http://172.104.171.131";
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const parseJSON = response => {
  return new Promise(resolve => {
    resolve({
      status: response.status,
      statusText: response.statusText,
      json: response.data,
    })
  })
}

export const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Authorization': `${localStorage.token}`,
})

console.log('JwtToken', localStorage.token)

export const request = (method, url, options) => new Promise((resolve, reject) => {
  axios({
    method: method,
    url: `${baseURL}${url}`,
    header: headers(),
    withCredentials: false,
    ...options,
  }).then(parseJSON)
    .then(res => resolve(res.json))
    .catch(err => reject(err))
})