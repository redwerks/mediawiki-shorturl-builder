import { ServerData } from '../detector/types';
import { ServerType } from '../extractor';
import { InstructionData } from './makeInstructions';

export interface ServerInstructions {
  serverTypes: ServerType[];
  addServerInstructions?(
    serverData: ServerData,
    instructions: InstructionData[]
  ): void;
}
