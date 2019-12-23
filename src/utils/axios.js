import axios from 'axios';
import config from '../config';

export const API = axios.create({
  baseURL: config.BASE_URL_API,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + config.API_AUTH,
  },
});
