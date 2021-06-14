export type ServerType =
  | 'apache'
  | 'litespeed'
  | 'nginx'
  | 'lighttpd'
  | 'lighttpd14'
  | 'iis';

/**
 * List of supported server types
 */
export const supportedServers = [
  'Apache',
  'LiteSpeed',
  'Nginx',
  'Lighttpd',
  'IIS 7+',
];

/**
 * Server selection options
 */
export const serverTypes: { value: ServerType; label: string }[] = [
  { value: 'apache', label: 'Apache' },
  { value: 'litespeed', label: 'LiteSpeed' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'lighttpd', label: 'Lighttpd (1.5.x+)' },
  { value: 'lighttpd14', label: 'Lighttpd 1.4.x or below' },
  { value: 'iis', label: 'IIS 7+' },
];
