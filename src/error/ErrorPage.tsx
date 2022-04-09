import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorBox } from '../error-message';
import { Layout } from '../layout/Layout';

function getErrorMessage(error: any): string | undefined {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  }
}
function getErrorText(error: any): string | undefined {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return error.message + '\n----\n' + error.stack;
  }
}

const ErrorPage = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  const reportLink = new URL(
    'https://github.com/redwerks/mediawiki-shorturl-builder/issues/new'
  );
  reportLink.searchParams.set(
    'title',
    'Unexpected error: ' + getErrorMessage(error)
  );
  reportLink.searchParams.set(
    'body',
    [
      '*Please enter more information*',
      '',
      '- [ ] I have checked for related issues',
      '',
      '## Context',
      '<details>',
      '<summary>Details</summary>',
      '<pre>',
      getErrorText(error),
      '</pre>',
      '</details>',
    ].join('\n')
  );

  return (
    <Layout>
      <ErrorBox
        severity="error"
        title="Unexpected error"
        sx={{
          marginBottom: 4,
          minWidth: 0,
          '& > .MuiAlert-message': { minWidth: 0 },
        }}
      >
        <Box component="p">
          An unexpected error has occurred with the following message:
        </Box>

        <pre style={{ marginTop: 0 }}>{getErrorMessage(error)}</pre>

        <Button
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          component="a"
          href={reportLink.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Report on GitHub
        </Button>

        <Box component="details" sx={{ minWidth: 0 }}>
          <summary>Details</summary>
          <Box
            component="pre"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              p: 1,
              overflow: 'auto',
              minWidth: 0,
              maxWidth: '100%',
            }}
          >
            {getErrorText(error)}
          </Box>
        </Box>

        <Button
          variant="outlined"
          onClick={() => {
            resetErrorBoundary();
          }}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </ErrorBox>
    </Layout>
  );
};

export interface ErrorPageBoundaryProps {
  children: ReactNode;
}

/**
 * Error boundary for catching whole page errors thrown in components
 */
export const ErrorPageBoundary = (props: ErrorPageBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      {props.children}
    </ErrorBoundary>
  );
};
