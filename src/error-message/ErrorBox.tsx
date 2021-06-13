import { Alert, AlertTitle, styled } from '@material-ui/core';
import { ComponentProps, ReactNode } from 'react';

export const ErrorBoxRoot = styled(Alert, {
  name: 'ErrorBox',
  slot: 'Root',
})(({ theme }) => ({
  '& p': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
}));

export type ErrorBoxProps = Omit<
  ComponentProps<typeof ErrorBoxRoot>,
  'title' | 'children'
> & {
  title?: ReactNode;
  children?: ReactNode;
};

/**
 * An error message box
 */
export const ErrorBox = (props: ErrorBoxProps) => {
  const { title, children, ...other } = props;

  return (
    <ErrorBoxRoot elevation={1} {...other}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </ErrorBoxRoot>
  );
};
