import { apache } from './apache';
import { iis } from './iis';
import { lighttpd } from './lighttpd';
import { nginx } from './nginx';
import { ServerData } from '../../detector/types';
import { InstructionData } from '../makeInstructions';
import { extractServerType } from '../../extractor';
import { ServerInstructions } from '../ServerInstructions';

const serverInstructions: ServerInstructions[] = [apache, iis, lighttpd, nginx];

/**
 * Add per-server instructions
 */
export function addServerInstructions(
  serverData: ServerData,
  instructions: InstructionData[]
) {
  const serverType = extractServerType(serverData);

  if (serverType) {
    for (const serverTypeInstructions of serverInstructions) {
      if (serverTypeInstructions.serverTypes.includes(serverType)) {
        serverTypeInstructions.addServerInstructions?.(
          serverData,
          instructions
        );
      }
    }
  }
}

/**
 * Check if we have a thumbnail handler rewrite for the server type
 */
export function serverSupportsThumbnails(serverData: ServerData): boolean {
  const serverType = extractServerType(serverData);

  if (serverType) {
    for (const serverTypeInstructions of serverInstructions) {
      if (serverTypeInstructions.serverTypes.includes(serverType)) {
        if (serverTypeInstructions.hasThumbnailHandler) {
          return true;
        }
      }
    }
  }

  return false;
}
