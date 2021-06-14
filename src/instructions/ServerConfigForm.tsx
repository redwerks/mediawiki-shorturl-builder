import {
  Box,
  Collapse,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, Formik, FormikConfig } from 'formik';
import { useMemo } from 'react';
import { ServerData } from '../detector/types';
import {
  extractHashedUploads,
  extractHasRoot,
  extractModPhp,
  extractScript,
  extractServerType,
  isServerFullyDetected,
  serverTypes,
  supportedServers,
} from '../extractor';
import {
  CheckboxField,
  RadioGroupField,
  SelectField,
  StringField,
} from '../form';

const radioValue = (value: boolean | undefined): 'on' | 'off' | undefined =>
  typeof value === 'boolean' ? (value ? 'on' : 'off') : undefined;

export interface ServerConfigFormValues {
  server: string;
  script: string;
  hasheduploads: boolean | undefined;
  hasRoot: 'on' | 'off' | undefined;
  modPhp: boolean | undefined;
}

export interface ServerConfigFormProps {
  serverData: ServerData;
  onSubmit: FormikConfig<ServerConfigFormValues>['onSubmit'];
}

export const ServerConfigForm = (props: ServerConfigFormProps) => {
  const { serverData, onSubmit } = props;

  const initialValues = useMemo<ServerConfigFormValues>(() => {
    return {
      server: extractServerType(serverData) ?? '',
      script: extractScript(serverData),
      hasheduploads: extractHashedUploads(serverData),
      // Apache
      hasRoot: radioValue(extractHasRoot(serverData)),
      modPhp: extractModPhp(serverData),
    };
  }, [serverData]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography component="h2" variant="subtitle2" gutterBottom>
              Detected settings
            </Typography>

            {isServerFullyDetected(serverData) ? (
              <Typography>
                These settings have been automatically detected when we checked
                the url you gave us. You can double check they are correct if
                you wish.
              </Typography>
            ) : (
              <Typography>
                We've detected most of these settings, please double check the
                settings, and fill in any we are missing.
              </Typography>
            )}

            <Typography
              component="h2"
              variant="subtitle1"
              sx={{ marginTop: 2 }}
            >
              Server type
            </Typography>
            <Typography variant="body2">
              Please ensure that we have the correct type of server.
            </Typography>
            <Typography
              sx={{ fontStyle: 'italic' }}
              variant="body2"
              color="textSecondary"
            >
              Note that we currently only support{' '}
              {supportedServers.join(', ').replace(/, (?=[^,]+$)/, ', and ')}{' '}
              configurations.
            </Typography>

            <SelectField label="Server type" name="server" required>
              <MenuItem value="">(please select a server type)</MenuItem>
              {serverTypes.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </SelectField>

            <Collapse in={values.server === 'apache'}>
              <Paper variant="outlined" sx={{ padding: 2 }}>
                <Typography component="h3" variant="subtitle2" gutterBottom>
                  Apache
                </Typography>
                <Typography variant="body2">
                  If you're running Apache please ensure these options are
                  correct.
                </Typography>

                <RadioGroupField name="hasRoot" label="Root access?">
                  <FormControlLabel
                    value="off"
                    label="I don't have root access, please use .htaccess files."
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="on"
                    label="I have root access on my server, plese output apache config."
                    control={<Radio />}
                  />
                </RadioGroupField>

                <CheckboxField
                  name="modPhp"
                  label="I am using mod_php (not FastCGI or CGI)"
                />
              </Paper>
            </Collapse>

            <Typography
              component="h2"
              variant="subtitle1"
              sx={{ marginTop: 2 }}
            >
              Script
            </Typography>
            <Typography variant="body2">
              Double check that we have the right path (relative to the document
              root) for index.php.
            </Typography>
            <StringField label="Path to index.php" name="script" required />

            <Typography
              component="h2"
              variant="subtitle1"
              sx={{ marginTop: 2 }}
            >
              Hashed uploads
            </Typography>
            <CheckboxField
              label="Hashed upload directories (MediaWiki default is on)"
              name="hasheduploads"
            />

            <Box sx={{ marginTop: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};
