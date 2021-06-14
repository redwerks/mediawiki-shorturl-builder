import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';

/**
 * Check if ServerData has enough data to give instructions or we need input from the user
 */
export function isServerFullyDetected(serverData: ServerData): boolean {
  const { phpsapi, script, articlepath, scriptpath } = serverData;

  // If any of these are missing in the detected data, we're guessing
  if (!phpsapi || !script || !articlepath || !scriptpath) return false;

  // If we don't know the server, it's definitely a guess
  if (!extractServerType(serverData)) return false;

  // Otherwise, we'll assume we're not guessing
  return true;
}
