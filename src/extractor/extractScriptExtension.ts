import { ServerData } from '../detector/types';

/**
 * Extract $wgScriptExtension from ServerData
 */
export function extractScriptExtension(serverData: ServerData): string {
  const { script } = serverData;

  const m = script && /\.[a-z0-9]+$/i.exec(script);
  if (m) return m[0];

  return '.php';
}
