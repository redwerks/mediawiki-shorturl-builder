import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServerData } from '../detector/types';
import { isServerFullyDetected } from '../extractor';
import { ServerConfigForm, ServerConfigFormValues } from '../instructions';
import { ArticlePathForm } from '../instructions';
import { InstructionIntro } from '../instructions';
import { Instructions } from '../instructions';
import { Layout } from '../layout/Layout';

export interface ResultRouteProps {
  serverData: ServerData;
}

/**
 * Display config instructions / server config forms after auto-detection
 */
const ResultRoute = (props: ResultRouteProps) => {
  const { serverData } = props;

  const [, setSearchParams] = useSearchParams({});

  const submitServerConfig = useCallback(
    async (values: ServerConfigFormValues) => {
      const { url } = serverData;

      setSearchParams(
        { url },
        {
          state: {
            url,
            serverData: {
              ...serverData,
              servertype: values.server || undefined,
              script: values.script,
              hasheduploads: values.hasheduploads,
              hasroot: values.hasRoot,
              modphp: values.modPhp,
            } as ServerData,
          },
        }
      );
    },
    [serverData, setSearchParams]
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

  return (
    <Layout>
      <InstructionIntro serverData={serverData} />
      <ArticlePathForm serverData={serverData} />
      <Instructions serverData={serverData} />
    </Layout>
  );
};

export default ResultRoute;
