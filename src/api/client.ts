import axios from 'axios';

/**
 * Axios instance to use as the API client
 */
export const api = axios.create({
  baseURL: String(import.meta.env.VITE_API_BASE || '/api'),
});
