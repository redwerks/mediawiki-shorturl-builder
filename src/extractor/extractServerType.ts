import invariant from 'invariant';
import { ServerData } from '../detector/types';
import { ServerType } from './servers';

/**
 * Extract the server type from ServerData
 */
export function extractServerType(
  serverData: ServerData
): ServerType | undefined {
  const { servertype, phpsapi, serverinfo } = serverData;

  // Override from the server config form
  if (servertype) return servertype;

  if (phpsapi === 'apache2handler') {
    // If the apache2handler sapi is used then this is definitely apache no matter what the front end Server: says
    return 'apache';
  } else if (phpsapi === 'litespeed') {
    // If the litespeed sapi is usedthen this is definitely Litespeed
    return 'litespeed';
  } else if (serverinfo) {
    if (/^Apache\b/i.test(serverinfo)) return 'apache';
    if (/^LiteSpeed\b/i.test(serverinfo)) return 'litespeed';
    if (/^nginx\b/i.test(serverinfo)) return 'nginx';
    if (/^lighttpd\/(\d+(\.\d+)*)/i.test(serverinfo)) {
      const m = /^lighttpd\/(\d+(\.\d+)*)/i.exec(serverinfo);
      invariant(m, 'pattern should always match');
      const version = m[1].split('.').map((i) => parseInt(i));
      if (version[0] <= 1 && version[1] <= 4) {
        // Lighttpd 1.4.x or before doesn't have $PHYSICAL or deny-all
        return 'lighttpd14';
      } else {
        // Lighttpd 1.5.x+
        return 'lighttpd';
      }
    }
    if (/^Microsoft-IIS\b/i.test(serverinfo)) return 'iis';
  }

  // Server unknown
  return undefined;
}
