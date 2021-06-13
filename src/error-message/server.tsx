import { ServerError } from '../api/error';
import { ErrorBoxInfo } from './types';

/**
 * Get a title and message for a non-detection server error
 */
export function getServerStackError(error: ServerError): ErrorBoxInfo {
  return {
    title: 'An unexpected error has occurred.',
    message: (
      <>
        <p>
          Were sorry, but the detection server has failed due to an unexpected
          error.
        </p>
        <pre>
          {error.message}
          {'\n'}
          {Object.entries(error.error)
            .filter(([key]) => key !== 'message' && key !== 'stack')
            .map(
              ([key, line]) =>
                `${key}: ${
                  typeof line === 'string'
                    ? line
                    : JSON.stringify(line, null, 2)
                }`
            )
            .join('\n')}
          {error.error.stack && `\n\nStack:\n${error.error.stack}`}
        </pre>
      </>
    ),
  };
}
