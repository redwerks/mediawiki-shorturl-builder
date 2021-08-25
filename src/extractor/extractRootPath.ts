import { ServerData } from '../detector/types';
import { extractArticlePath } from './extractArticlePath';
import { extractScript } from './extractScript';

/**
 * Extract the root path common to the script and article paths
 */
export function extractRootPath(serverData: ServerData): string {
  const articlePath = extractArticlePath(serverData);
  const script = extractScript(serverData);

  if (!articlePath) return '/';

  let ap = articlePath.split('/');
  let sp = script.split('/');

  const path = [];
  while (ap.length > 0 && sp.length > 0) {
    const a = ap.shift();
    const s = sp.shift();

    if (a !== s) break;

    path.push(a);
  }

  return path.join('/');
}
