import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServerData } from '../detector/types';
import { isServerFullyDetected } from '../extractor';
import {
  ArticlePathForm,
  InstructionIntro,
  Instructions,
  ServerConfigForm,
  ServerConfigFormValues,
} from '../instructions';
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

  const updateServerData = useCallback(
    (cb: (serverData: ServerData) => ServerData) => {
      const { url } = serverData;

      setSearchParams(
        { url },
        {
          state: {
            url,
            serverData: cb(serverData),
          },
        }
      );
    },
    [serverData, setSearchParams]
  );

  const submitServerConfig = useCallback(
    async (values: ServerConfigFormValues) => {
      const radioValue = (
        value: 'on' | 'off' | undefined
      ): boolean | undefined =>
        value === 'on' ? true : value === 'off' ? false : undefined;

      updateServerData((serverData) => ({
        ...serverData,
        servertype: values.server || undefined,
        script: values.script,
        hasheduploads: values.hasheduploads,
        hasroot: radioValue(values.hasRoot),
        modphp: values.modPhp,
      }));
    },
    [updateServerData]
  );

  if (!isServerFullyDetected(serverData)) {
    return (
      <Layout>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Detected settings
        </Typography>
        <ServerConfigForm
          serverData={serverData}
          onSubmit={submitServerConfig}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <InstructionIntro
        serverData={serverData}
        updateServerData={updateServerData}
      />
      <ArticlePathForm serverData={serverData} />
      <Instructions serverData={serverData} />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Detected settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ServerConfigForm
            serverData={serverData}
            onSubmit={submitServerConfig}
          />
        </AccordionDetails>
      </Accordion>
    </Layout>
  );
};

export default ResultRoute;
