import { ServerType } from '../extractor/servers';
// @note Excluded from index.ts so it can be shared

/**
 * IP reverse dns info
 */
export interface ReverseAddrInfo {
  ip: string;
  dnsnames: string[] | null;
}

/**
 * ServerData returned by the detector
 */
export interface ServerData {
  url: string;
  serverinfo?: string;
  reversedns?: {
    origin: string;
    addrs: ReverseAddrInfo[];
  };
  phpsapi?: string;
  script?: string;
  articlepath?: string;
  scriptpath?: string;
  server?: string;
  mainpage?: string;
  hasheduploads?: boolean;
  // Client-only overrides
  servertype?: ServerType;
  hasroot?: boolean;
  modphp?: boolean;
}
