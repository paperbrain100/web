import axios from 'axios';
import Cookies from 'js-cookie';

export const client = axios.create({
  baseURL: 'https://web-production-f9ae.up.railway.app/',
  // baseURL: 'https://paperbrain.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('apiKey')}`,
  },
});
