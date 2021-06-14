import { TextField, TextFieldProps } from '@material-ui/core';
import { useField, UseFieldProps } from 'formik';
import { useFieldDisabled } from './utils/useFieldDisabled';

export type StringFieldProps<FieldValues> = UseFieldProps<FieldValues> &
  Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'select' | 'children'>;

export const StringField = <FieldValues extends unknown>(
  props: StringFieldProps<FieldValues>
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
      select={false}
      error={error || showError}
      helperText={showError ? meta.error : helperText}
      disabled={disabled}
    />
  );
};
