import { throwDetectionError } from './error';
import { ServerData } from './types';

/**
 * Extract partial ServerData from MW api siteinfo data and image metadata
 */
export function detectSiteInfo(
  apiData: any
): Pick<
  ServerData,
  | 'url'
  | 'phpsapi'
  | 'script'
  | 'articlepath'
  | 'scriptpath'
  | 'server'
  | 'mainpage'
  | 'hasheduploads'
> {
  if (!apiData)
    throwDetectionError('API_RESPONSE_INVALID', 'api: unknown response');
  if (!apiData.query)
    throwDetectionError('API_RESPONSE_INVALID', 'api: query missing');
  if (!apiData.query.general)
    throwDetectionError('API_RESPONSE_INVALID', 'api: query.general missing');

  // SiteInfo data
  const { base, phpsapi, script, articlepath, scriptpath, server, mainpage } =
    apiData.query.general;

  // Look at the URL of an image to check if hashed uploads are enabled
  let hasheduploads: boolean | undefined = undefined;
  if (Array.isArray(apiData.query.allimages)) {
    const img = apiData.query.allimages[0];
    if (img) {
      const isPathHashed =
        /\/images\/[0-9a-f]\/[0-9a-f]{2}\/[^/]+\.[^/.](?:\?|$)+/.test(
          img['url']
        );
      const isPathUnhashed = /\/images\/[^/]+\.[^/.](?:\?|$)+/.test(img['url']);

      hasheduploads = isPathHashed ? true : isPathUnhashed ? false : undefined;
    }
  }

  // ServerData
  return {
    url: base,
    phpsapi,
    script,
    articlepath,
    scriptpath,
    server,
    mainpage,
    hasheduploads,
  };
}
