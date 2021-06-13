import { ServerData } from '../detector/types';
import { api } from './client';

/**
 * API method for detecting the configuration of a MediaWiki installation
 */
export const apiDetect = (url: string): Promise<ServerData> =>
  api.post('detect', {}, { params: { url } }).then((res) => res.data);
