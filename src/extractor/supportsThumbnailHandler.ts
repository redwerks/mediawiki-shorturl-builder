import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';

/**
 * Extract whether a 404 thumbnail handler is supported
 */
export function supportsThumbnailHandler(serverData: ServerData): boolean {
  const serverType = extractServerType(serverData);

  // We haven't written IIS thumbnail handlers yet
  if (serverType === 'iis') return false;

  // Everything else should be ok
  return true;
}
