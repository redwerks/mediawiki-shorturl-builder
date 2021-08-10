/**
 * Normalize a user inputted $wgArticlePath
 */
export function normalizeArticlePath(articlePath: string): string | undefined {
  articlePath = articlePath ?? '';

  if (!articlePath.includes('$1')) {
    articlePath = articlePath.replace(/\/?$/, '/$1');
  }

  return articlePath;
}
