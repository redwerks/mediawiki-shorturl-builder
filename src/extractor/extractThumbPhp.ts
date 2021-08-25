import { ServerData } from '../detector/types';
import { extractScriptExtension } from './extractScriptExtension';
import { extractScriptPath } from './extractScriptPath';

/**
 * Extract the path to thumb.php
 */
export function extractThumbPhp(serverData: ServerData): string {
  const scriptPath = extractScriptPath(serverData);
  const scriptExt = extractScriptExtension(serverData);

  return `${scriptPath}/thumb${scriptExt}`;
}
