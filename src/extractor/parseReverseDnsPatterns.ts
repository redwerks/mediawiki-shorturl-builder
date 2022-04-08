import escapeRegexp from 'escape-string-regexp';

/**
 * Parse a file with reverse dns matching patterns into a collection of RegExps
 */
export function parseReverseDnsPatterns(patternFile: string): RegExp {
  const patterns: string[] = [];
  const lines = patternFile
    .replace(/%.+$/gm, '')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .split(/\r?\n/);
  for (let line of lines) {
    if (!line) continue;
    patterns.push(
      escapeRegexp(line)
        .replace(/#/g, '\\d+')
        .replace(/\\\*/g, '[^\\.]+')
        .replace(
          /\\\(((?:[^|()]+)(?:\\\|[^|()]+)+)\\\)/g,
          (m, p) => '(' + p.replace(/\\\|/g, '|') + ')'
        )
        .replace(/^\\\./, '(?:.+\\.)?')
        .replace(/$/, '$')
        .replace(/^/, '^')
    );
  }

  return new RegExp(patterns.join('|'), 'i');
}
