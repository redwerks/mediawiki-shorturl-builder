import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';

/**
 * Check whether the server is mod_php from ServerData
 */
export function extractModPhp(serverData: ServerData): boolean | undefined {
  const { phpsapi } = serverData;

  if (extractServerType(serverData) === 'apache') {
    if (phpsapi === 'apache2handler') {
      // mod_php is apache2handler
      return true;
    } else {
      // Other php sapis aren't mod_php and usually require $wgUsePathInfo.
      return false;
    }
  } else {
    // Not using Apache just default the checkbox to invariant
    return undefined;
  }
}
