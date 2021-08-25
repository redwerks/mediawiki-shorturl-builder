import { apache } from './apache';
import { iis } from './iis';
import { lighttpd } from './lighttpd';
import { nginx } from './nginx';
import { ServerData } from '../../detector/types';
import { InstructionData } from '../makeInstructions';
import { extractServerType } from '../../extractor';

const serverInstructions = [apache, iis, lighttpd, nginx];

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
