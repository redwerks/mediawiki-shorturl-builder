import { ServerData } from '../detector/types';
import { extractArticlePath } from './extractArticlePath';
import { extractMainPage } from './extractMainPage';

/**
 * Extract Main Page url from ServerData
 */
export function extractMainPageUrl(serverData: ServerData): string | undefined {
  const { url } = serverData;
  const articlePath = extractArticlePath(serverData);
  const mainPage = extractMainPage(serverData);

  if (url && articlePath) {
    return new URL(articlePath.replace('$1', mainPage), url).href;
  }
}
