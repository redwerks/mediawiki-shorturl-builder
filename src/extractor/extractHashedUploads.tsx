import { ServerData } from '../detector/types';

/**
 * Extract $wgHashedUploadDirectory from ServerData
 */
export function extractHashedUploads(serverData: ServerData): boolean {
  const { hasheduploads } = serverData;

  // Hashed uploads are on by default
  return hasheduploads ?? true;
}
