import { ServerInstructions } from '../ServerInstructions';

export const apache: ServerInstructions = {
  serverTypes: ['apache', 'litespeed'],
  addServerInstructions(serverData, instructions) {},
};
