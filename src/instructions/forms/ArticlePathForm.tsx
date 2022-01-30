import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServerData } from '../../detector/types';
import {
  extractArticlePath,
  normalizeArticlePath,
  supportsThumbnailHandler,
} from '../../extractor';
import { CheckboxField, StringField } from '../../form';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export interface ArticlePathFormValues {
  articlePath: string;
  thumbHandler: boolean;
}

export interface ArticlePathFormProps {
  serverData: ServerData;
}

export const ArticlePathForm = (props: ArticlePathFormProps) => {
  const { serverData } = props;
  const [, setSearchParams] = useSearchParams({});

  const submit = useCallback(
    async (values: ArticlePathFormValues) => {
      const { url } = serverData;

      setSearchParams(
        { url },
        {
          state: {
            url,
            serverData: {
              ...serverData,
              articlepath: normalizeArticlePath(values.articlePath),
              thumbhandler: values.thumbHandler,
            } as ServerData,
          },
        }
      );
    },
    [serverData, setSearchParams]
  );
  const initialValues = useMemo<ArticlePathFormValues>(() => {
    return {
      articlePath: extractArticlePath(serverData) ?? '',
      // Include 404 thumbnail handler config? Enabled by default
      thumbHandler: serverData.thumbhandler ?? true,
    };
  }, [serverData]);

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={submit}>
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 2 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <StringField
                label="Article Path"
                name="articlePath"
                required
                margin="none"
                fullWidth
              />
              {supportsThumbnailHandler(serverData) && (
                <CheckboxField
                  label="Include 404 thumbnail handler config"
                  name="thumbHandler"
                />
              )}
            </Box>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ marginLeft: 1 }}
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
