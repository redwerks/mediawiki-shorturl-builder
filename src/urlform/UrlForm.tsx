import { Box, experimentalStyled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import invariant from 'invariant';
import { FormEvent, useState } from 'react';
import { apiDetect } from '../api';
import { useSearchParams } from 'react-router-dom';

const UrlField = experimentalStyled(TextField, { label: 'UrlField' })(
  ({ theme }) => ({
    flex: 1,
    '& .MuiOutlinedInput-input': {
      ...theme.typography.body1,
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    },
  })
);

export interface UrlFormProps {
  initialUrl?: string;
}

export const UrlForm = (props: UrlFormProps) => {
  const { initialUrl } = props;
  const [query, setSearchParams] = useSearchParams({});
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState(initialUrl ?? query.get('url') ?? '');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(url, 'url is required');

    setSubmitting(true);
    try {
      const serverData = await apiDetect(url);
      setSearchParams(
        { url },
        {
          state: {
            url,
            serverData,
          },
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setSearchParams(
          { url },
          {
            state: {
              url,
              error: e.response?.data,
            },
          }
        );
      } else {
        // @fixme Display a large error snackbar with more information available
        throw e;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      action="/"
      method="get"
      sx={{ marginBottom: 2 }}
      onSubmit={submit}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <UrlField
          type="url"
          name="url"
          label="Your Wiki's URL"
          placeholder="http://mywiki.com/index.php?title=Main_Page"
          required
          disabled={submitting}
          margin="none"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ marginLeft: 1 }}
          loading={submitting}
        >
          Go
        </LoadingButton>
      </Box>
    </Box>
  );
};
