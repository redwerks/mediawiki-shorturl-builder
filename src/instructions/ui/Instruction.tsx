import { styled, Typography } from '@mui/material';
import { InstructionData } from '../makeInstructions';

const InstructionRoot = styled('div', { name: 'Instruction', slot: 'Root' })(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  })
);

export interface InstructionProps {
  instruction: InstructionData;
}

export const Instruction = (props: InstructionProps) => {
  const { name, content } = props.instruction;

  return (
    <InstructionRoot>
      <Typography variant="subtitle1">{name}</Typography>
      {content}
    </InstructionRoot>
  );
};
