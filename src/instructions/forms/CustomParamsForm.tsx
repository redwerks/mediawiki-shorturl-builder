import { LoadingButton } from '@mui/lab';
import { Form, Formik, FormikConfig } from 'formik';
import { ReactNode, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormikValues } from '../../../node_modules/formik/dist/types';
import { ServerData } from '../../detector/types';

export interface CustomParamsFormProps<Values extends FormikValues> {
  serverData: ServerData;
  initialValues: FormikConfig<Values>['initialValues'];
  update: (values: Values) => Partial<ServerData>;
  submitLabel?: string;
  children?: ReactNode;
}

/**
 * Small form for modifying server specific params
 */
export const CustomParamsForm = <Values extends FormikValues>(
  props: CustomParamsFormProps<Values>
) => {
  const {
    serverData,
    initialValues,
    update,
    submitLabel = 'Submit',
    children,
  } = props;

  const [, setSearchParams] = useSearchParams({});

  const submit = useCallback(
    async (values: Values) => {
      const { url } = serverData;

      setSearchParams(
        { url },
        {
          state: {
            url,
            serverData: { ...serverData, ...update(values) },
          },
        }
      );
    },
    [serverData, setSearchParams, update]
  );

  return (
    <Formik<Values>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          {children}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {submitLabel}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};
