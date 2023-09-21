import axios from 'axios';
import Cookies from 'js-cookie';

export const client = axios.create({
  // baseURL: 'http://127.0.0.1:5000/',
  // baseURL: 'http://ec2-54-199-57-42.ap-northeast-1.compute.amazonaws.com/',
  baseURL: 'https://paperbrain.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('apiKey')}`,
  },
});
