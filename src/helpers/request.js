import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3005';
const token = process.env.REACT_APP_API_TOKEN;

const request = axios.create({
  baseURL: baseUrl,
  headers: {
    common: {
      Authorization: 'Bearer ' + token,
    },
  },
});

export default request;
