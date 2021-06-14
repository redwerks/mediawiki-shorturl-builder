import { ServerData } from '../detector/types';

/**
 * Extract $wgScript from ServerData
 */
export function extractScript(serverData: ServerData): string {
  const { script } = serverData;

  return script || '/index.php';
}
