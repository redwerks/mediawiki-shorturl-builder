import axios from 'axios';

/**
 * Axios instance to use as the API client
 */
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '/api',
});
