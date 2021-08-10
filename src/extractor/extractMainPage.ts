import { ServerData } from '../detector/types';

/**
 * Extract "Main Page" name
 */
export function extractMainPage(serverData: ServerData): string {
  const { mainpage } = serverData;

  return (mainpage ?? 'Main Page').replace(/ /g, '_');
}
