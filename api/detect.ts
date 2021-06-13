import { VercelRequest, VercelResponse } from '@vercel/node';
import { detect, DetectionError } from '../src/detector';
import { convertNetworkError } from '../src/detector/api';

/**
 * API for detecting the configuration of a MediaWiki installation
 */
export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  const { url } = req.query;

  try {
    const serverdata = await detect(Array.isArray(url) ? url[0] : url);

    res.status(200).json(serverdata);
  } catch (err) {
    const error = convertNetworkError(err);

    if (error instanceof DetectionError) {
      res.status(400).json(error);
      return;
    }

    res.status(500).json({
      message: 'Unexpected server error',
      error: { ...error, message: error.message, stack: error.stack },
    });
  }
};
