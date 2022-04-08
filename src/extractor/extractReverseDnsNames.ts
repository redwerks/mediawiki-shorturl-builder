import { ServerData } from '../detector/types';

/**
 * Extract a list of unique reversedns names from ServerData
 */
export function extractReverseDnsNames(serverData: ServerData): string[] {
  const dnsnames = new Set<string>();

  if (serverData?.reversedns?.addrs) {
    for (const addr of serverData.reversedns.addrs) {
      if (addr.dnsnames) {
        for (const dnsname of addr.dnsnames) {
          dnsnames.add(dnsname);
        }
      }
    }
  }

  return Array.from(dnsnames.values());
}
