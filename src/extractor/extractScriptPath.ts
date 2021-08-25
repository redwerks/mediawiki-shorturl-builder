import { ServerData } from '../detector/types';
import { extractScript } from './extractScript';

/**
 * Extract $wgScriptPath from ServerData
 */
export function extractScriptPath(serverData: ServerData): string {
  const script = extractScript(serverData);

  const path = script.split('/');
  path.pop();
  return path.join('/');
}
