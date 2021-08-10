import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServerData } from '../detector/types';
import { extractArticlePath, normalizeArticlePath } from '../extractor';
import { StringField } from '../form';
import { LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export interface ArticlePathFormValues {
  articlePath: string;
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
    };
  }, [serverData]);

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={submit}>
      {({ isSubmitting, values }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 2 }}>
            <StringField
              label="Article Path"
              name="articlePath"
              required
              margin="none"
              fullWidth
            />
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
