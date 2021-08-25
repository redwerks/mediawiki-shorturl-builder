import { ReactElement } from 'react';
import { ServerData } from '../detector/types';
import { makeLocalSettings } from './localSettings';
import { addServerInstructions } from './servers';

export interface InstructionData {
  type: 'file';
  name: string;
  content: ReactElement;
}

/**
 * Generate configuration instructions for a server
 */
export function makeInstructions(serverData: ServerData): InstructionData[] {
  const instructions: InstructionData[] = [];

  instructions.push(makeLocalSettings(serverData));

  addServerInstructions(serverData, instructions);

  return instructions;
}
