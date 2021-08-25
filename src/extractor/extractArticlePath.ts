import { ServerData } from '../detector/types';

/**
 * Extract $wgArticlePath from ServerData
 */
export function extractArticlePath(serverData: ServerData): string | undefined {
  const { articlepath } = serverData;

  return articlepath;
}
