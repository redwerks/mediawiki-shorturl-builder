import { styled } from '@material-ui/core';
import { useMemo } from 'react';
import { ServerData } from '../detector/types';
import { makeInstructions } from './makeInstructions';
import { Instruction } from './Instruction';

const InstructionsRoot = styled('div', { name: 'Instructions', slot: 'Root' })(
  ({ theme }) => ({})
);

export interface InstructionsProps {
  serverData: ServerData;
}

export const Instructions = (props: InstructionsProps) => {
  const { serverData } = props;
  const instructions = useMemo(
    () => makeInstructions(serverData),
    [serverData]
  );

  return (
    <InstructionsRoot>
      {instructions.map((instruction) => (
        <Instruction key={instruction.name} instruction={instruction} />
      ))}
    </InstructionsRoot>
  );
};
