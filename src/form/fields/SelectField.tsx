import { TextField, TextFieldProps } from '@material-ui/core';
import { useField, UseFieldProps } from 'formik';
import { useFieldDisabled } from './utils/useFieldDisabled';

export type SelectFieldProps<FieldValues> = UseFieldProps<FieldValues> &
  Omit<TextFieldProps, 'name' | 'value' | 'onChange'>;

export const SelectField = <FieldValues extends unknown>(
  props: SelectFieldProps<FieldValues>
) => {
  const {
    disabled: disabledProp,
    error,
    helperText,
    ...textFieldProps
  } = props;
  const disabled = useFieldDisabled(disabledProp);
  const [field, meta] = useField({
    ...textFieldProps,
  });

  const showError = meta.touched && !!meta.error;

  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      error={error || showError}
      helperText={showError ? meta.error : helperText}
      disabled={disabled}
    />
  );
};
