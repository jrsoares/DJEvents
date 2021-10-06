import axios from 'axios';

import { parseCookies } from 'nookies';

const { 'djevent.token': jwt } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:1337"
})

if (jwt) {
  api.defaults.headers['Authorization'] = `Bearer ${jwt}`
}
