import { ServerData } from '../detector/types';
import { supportsThumbnailHandler } from './supportsThumbnailHandler';

/**
 * Check whether to include a thumbnail handler
 */
export function includeThumbnailHandler(serverData: ServerData): boolean {
  const { thumbhandler = true } = serverData;

  return thumbhandler && supportsThumbnailHandler(serverData);
}
