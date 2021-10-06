import axios from 'axios';

import { parseCookies } from 'nookies';

export function getAPIClient(ctx) {
  
  const { 'djevent.token': jwt } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:1337"
  })

  if (jwt) {
    api.defaults.headers['Authorization'] = `Bearer ${jwt}`
  }

  return api;
}
