import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';

/**
 * Check whether the user has root access
 */
export function extractHasRoot(serverData: ServerData): boolean | undefined {
  if (extractServerType(serverData) === 'apache') {
    // Apache can be configured with root access and without root access
    // Use Reverse DNS hostnames to guess whether the user has root access

    // @todo Port the reversedns handling

    return undefined;
  } else {
    // Only apache has non-root config so we default on for everything but it
    return true;
  }
}
