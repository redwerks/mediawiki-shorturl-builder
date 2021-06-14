import { FormHelperText } from '@material-ui/core';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  RadioGroupProps,
} from '@material-ui/core';
import { useField, UseFieldProps } from 'formik';
import { ReactNode } from 'react';
import { useFieldDisabled } from './utils/useFieldDisabled';

export type RadioGroupFieldProps<FieldValues> = UseFieldProps<FieldValues> &
  Omit<RadioGroupProps, 'name' | 'value' | 'onChange'> & {
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    label?: ReactNode;
  };

export const RadioGroupField = <FieldValues extends unknown>(
  props: RadioGroupFieldProps<FieldValues>
) => {
  const {
    label,
    disabled: disabledProp,
    error,
    helperText: helperTextProp,
    ...radioGroupProps
  } = props;
  const disabled = useFieldDisabled(disabledProp);
  const [field, meta] = useField({
    ...radioGroupProps,
  });

  const showError = meta.touched && !!meta.error;
  const helperText = showError ? meta.error : helperTextProp;

  return (
    <FormControl component="fieldset" error={showError} disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...radioGroupProps} {...field} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
