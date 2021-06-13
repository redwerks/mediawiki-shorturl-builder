import { api } from './api';
import { detectApi, detectRsd } from './detect-api';
import { detectSiteInfo } from './detect-siteinfo';
import { throwDetectionError } from './error';
import { resolveReverseIps } from './resolve-reverse-ips';
import { ServerData } from './types';

/**
 * Detect the configuration of a MediaWiki Installation
 */
export async function detect(
  url: string | undefined | null
): Promise<ServerData> {
  // Validate the URL
  if (!url) throwDetectionError('URL_REQUIRED', 'url: is required');
  let u: URL;
  try {
    u = new URL(url);
  } catch (e) {
    throwDetectionError('URL_INVALID', 'url: is invalid');
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:')
    throwDetectionError('URL_INVALID_PROTOCOL', 'url: protocol is invalid');

  // Fetch the URL
  const res = await api.get(url, {
    validateStatus: (status) =>
      (status >= 200 && status < 300) || status === 404,
  });

  // Lookup IP addresses and reverse dns for the site
  const reversedns: ServerData['reversedns'] = {
    origin: u.hostname,
    addrs: await resolveReverseIps(u.hostname),
  };

  if (typeof res.data !== 'string')
    throwDetectionError('RES_NOT_HTML', 'html: result is not html');

  // Parse the fetched page and look for the API
  const rsdUrl = detectRsd(res.data, url);
  const rsd = await api.get(rsdUrl).then((res) => res.data);
  if (!rsd) throwDetectionError('RSD_EMPTY', 'rsd: empty');
  const apiUrl = detectApi(rsd, rsdUrl);

  // Get site info and an image url from the API
  const apiData = await api
    .get(apiUrl, {
      params: {
        action: 'query',
        meta: 'siteinfo',
        list: 'allimages',
        ailimit: '1',
        aiprop: 'url',
        format: 'json',
      },
    })
    .then((res) => res.data);

  return {
    serverinfo: res.headers['server'],
    reversedns,
    ...detectSiteInfo(apiData),
  };
}
