/**
 * Make sure a path ends with a /
 */
export function pathWithTail(path: string): string {
  return path ? path.replace(/\/?$/, '/') : '';
}
