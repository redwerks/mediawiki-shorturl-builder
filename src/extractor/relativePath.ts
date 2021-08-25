/**
 * Get a relative version of a path
 */
export function relativePath(path: string): string {
  const p = path.split('/');
  p.shift();
  return p.join('/');
}
