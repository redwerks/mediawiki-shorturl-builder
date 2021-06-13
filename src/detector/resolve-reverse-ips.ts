import { promises as dns } from 'dns';
import { isNodeError } from '../utils/isNodeError';
import { ReverseAddrInfo } from './types';

/**
 * Return an empty array instead of an error
 */
function nodata(error: unknown): string[] {
  if (isNodeError(error) && error.code === 'ENODATA') {
    return [];
  }

  throw error;
}

/**
 * Given a hostname resolve all the IPs it points to and the reverse DNS of those IPs
 */
export async function resolveReverseIps(
  hostname: string
): Promise<ReverseAddrInfo[]> {
  const ip4s = dns.resolve4(hostname).catch(nodata);
  const ip6s = dns.resolve6(hostname).catch(nodata);
  const ips = await Promise.all([ip4s, ip6s]).then((ips) => ips.flat());

  return await Promise.all(
    ips.map(async (ip) => {
      try {
        const dnsnames = await dns.reverse(ip);
        return { ip, dnsnames };
      } catch (error) {
        if (isNodeError(error) && error.code === 'ENOTFOUND') {
          return { ip, dnsnames: null };
        } else {
          throw error;
        }
      }
    })
  );
}
