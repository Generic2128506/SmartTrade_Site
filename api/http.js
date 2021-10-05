import axios from 'axios';

export const SMARTTRADE_API_URL = process.env.REACT_APP_SMARTTRADE_API_URL;

export default axios.create({
  baseURL: SMARTTRADE_API_URL,
  withCredentials: true,
});
