import { Handler } from '@netlify/functions';
import { detect, DetectionError } from '../../src/detector';
import { convertNetworkError } from '../../src/detector/api';

/**
 * API for detecting the configuration of a MediaWiki installation
 */
export const handler: Handler = async (event) => {
  const { url } = event.queryStringParameters || {};

  try {
    const serverdata = await detect(url);

    return {
      statusCode: 200,
      body: JSON.stringify(serverdata),
    };
  } catch (error) {
    error = convertNetworkError(error);

    if (error instanceof DetectionError) {
      return { statusCode: 400, body: JSON.stringify(error) };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Unexpected server error',
        error: { ...error, stack: error.stack },
      }),
    };
  }
};
