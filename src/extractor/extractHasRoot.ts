import raw from 'raw.macro';
import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';
import { parseReverseDnsPatterns } from './parseReverseDnsPatterns';

const knownRootReverseDns = parseReverseDnsPatterns(
  raw('../known_root_reversedns.tex')
);

/**
 * Check whether the user has root access
 */
export function extractHasRoot(serverData: ServerData): boolean | undefined {
  // Override from the server config form
  if (typeof serverData.hasroot === 'boolean') return serverData.hasroot;

  if (extractServerType(serverData) === 'apache') {
    // Apache can be configured with root access and without root access
    // Use Reverse DNS hostnames to guess whether the user has root access

    if (serverData?.reversedns?.addrs) {
      const isKnownRoot = serverData.reversedns.addrs.some((addr) =>
        addr?.dnsnames?.some((dnsname) => {
          return knownRootReverseDns.test(dnsname);
        })
      );

      if (isKnownRoot) return true;
    }

    return undefined;
  } else {
    // Only apache has non-root config so we default on for everything but it
    return true;
  }
}
