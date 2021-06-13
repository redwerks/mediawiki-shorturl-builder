import { ServerDetectionError, ServerError } from '../api/error';
import { ErrorBox, getServerError } from '../error-message';
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
      <ErrorBox severity="warning" sx={{ marginBottom: 4 }} title={title}>
        {message}
      </ErrorBox>

      <UrlForm />
    </Layout>
  );
};

export default ServerErrorRoute;
