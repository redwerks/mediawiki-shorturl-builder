import { Alert, AlertTitle } from '@material-ui/core';
import { ServerError, ServerDetectionError } from '../api/error';
import { getServerError } from '../error-message';
import { Layout } from '../layout/Layout';
import { UrlForm } from '../urlform/UrlForm';

export interface ServerErrorRouteProps {
  error: ServerError | ServerDetectionError;
}

const ServerErrorRoute = (props: ServerErrorRouteProps) => {
  const { error } = props;
  const { title, message } = getServerError(error);

  return (
    <Layout>
      <Alert severity="warning" elevation={1} sx={{ marginBottom: 4 }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>

      <UrlForm />
    </Layout>
  );
};

export default ServerErrorRoute;
