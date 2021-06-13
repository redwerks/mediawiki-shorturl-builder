import axios from 'axios';
import { isNodeError, isSysCallError } from '../utils/isNodeError';
import { throwDetectionError } from './error';

export const api = axios.create({
  headers: {
    'User-Agent': 'MediaWikiShortUrlHelper/2.0',
  },
  maxRedirects: 5,
  timeout: 20 * 1000,
});

/**
 * Convert network errors into detection errors
 */
export function convertNetworkError(error: unknown): unknown {
  try {
    if (axios.isAxiosError(error) && error.response?.status)
      throwDetectionError(
        'SERVER_ERROR',
        `Server responded with a ${error.response.status} ${error.response.statusText} response.`,
        {
          status: error.response.status,
          statusText: error.response.statusText,
        }
      );
    if (isNodeError(error) && error.code === 'ENETUNREACH')
      throwDetectionError(
        'NETWORK_UNAVAILABLE',
        'Network connection unavailable.'
      );
    if (isSysCallError(error, 'getaddrinfo', 'ENOTFOUND'))
      throwDetectionError('SERVER_NOEXIST', "Server doesn't appear to exist.");
    if (isNodeError(error) && error.code === 'ECONNREFUSED')
      throwDetectionError('SERVER_REFUSED', 'Server refused the connection.');
    if (isNodeError(error) && error.code === 'ECONNABORTED')
      throwDetectionError('SERVER_TIMEOUT', 'Server did not respond in time.');
    if (isNodeError(error) && error.code === 'ERR_FR_TOO_MANY_REDIRECTS')
      throwDetectionError(
        'SERVER_REDIRECT',
        'Server redirected too many times.'
      );

    throw error;
  } catch (e) {
    return e;
  }
}
