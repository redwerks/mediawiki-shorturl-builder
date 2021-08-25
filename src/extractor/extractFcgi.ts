import { ServerData } from '../detector/types';
import { extractServerType } from './extractServerType';

export interface FcgiData {
  fcgiParams: string | undefined;
  fcgiPass: string;
}

/**
 * Extract fcgi params location and fcgi_pass for fcgi using servers
 */
export function extractFcgi(serverData: ServerData): FcgiData {
  const serverType = extractServerType(serverData);

  const defaultFcgiParams =
    serverType === 'nginx' ? '/etc/nginx/fastcgi_params' : undefined;

  let {
    fcgi_params: fcgiParams = defaultFcgiParams,
    fcgi_pass: fcgiPass = '127.0.0.1:9000',
  } = serverData;

  return { fcgiParams, fcgiPass };
}
