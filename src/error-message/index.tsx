import { ServerDetectionError, ServerError } from '../api/error';
import { getDetectionError } from './detection';
import { ErrorBoxInfo } from './types';

/**
 * Get a title and message for a server error
 */
export function getServerError(
  error: ServerError | ServerDetectionError
): ErrorBoxInfo {
  if ('error' in error) {
  } else {
    return getDetectionError(error);
  }

  return {
    title: 'Unexpected error',
    message: 'An unexpected error has occurred.',
  };
}
