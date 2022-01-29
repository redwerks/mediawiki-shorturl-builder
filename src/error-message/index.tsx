import { ServerDetectionError, ServerError } from '../api/error';
import { getDetectionError } from './detection';
import { getServerStackError } from './server';
import { ErrorBoxInfo } from './types';
export * from './ErrorBox';

/**
 * Get a title and message for a server error
 */
export function getServerError(
  error: ServerError | ServerDetectionError
): ErrorBoxInfo {
  if (typeof error === 'object' && 'error' in error) {
    return getServerStackError(error);
  } else {
    return getDetectionError(error);
  }
}
