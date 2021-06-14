import { ServerData } from '../detector/types';
import { isServerFullyDetected } from '../extractor';
import { Layout } from '../layout/Layout';
import { ServerConfigForm, ServerConfigFormValues } from '../instructions';
import { useCallback } from 'react';

export interface ResultRouteProps {
  serverData: ServerData;
}

/**
 * Display config instructions / server config forms after auto-detection
 */
const ResultRoute = (props: ResultRouteProps) => {
  const { serverData } = props;

  const submitServerConfig = useCallback(
    async (values: ServerConfigFormValues) => {},
    []
  );

  if (!isServerFullyDetected(serverData)) {
    return (
      <Layout>
        <ServerConfigForm
          serverData={serverData}
          onSubmit={submitServerConfig}
        />
      </Layout>
    );
  }

  return <Layout>...</Layout>;
};

export default ResultRoute;
