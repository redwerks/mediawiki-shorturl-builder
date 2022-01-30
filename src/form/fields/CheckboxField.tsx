import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import { useField, UseFieldProps } from 'formik';
import { useFieldDisabled } from './utils/useFieldDisabled';

export type CheckboxFieldProps<FieldValues> = UseFieldProps<FieldValues> &
  Omit<
    FormControlLabelProps,
    'name' | 'checked' | 'value' | 'onChange' | 'type' | 'control'
  > & {
    LabelProps?: FormControlLabelProps;
    CheckboxProps?: CheckboxProps;
  };

export const CheckboxField = <FieldValues extends unknown>(
  props: CheckboxFieldProps<FieldValues>
) => {
  const {
    disabled: disabledProp,
    LabelProps,
    CheckboxProps,
    ...labelProps
  } = props;
  const disabled = useFieldDisabled(disabledProp);
  const [field] = useField({
    type: 'checkbox',
    ...labelProps,
  });

  return (
    <FormControlLabel
      {...labelProps}
      {...field}
      disabled={disabled}
      control={
        <Checkbox
          indeterminate={field.value === undefined || field.value === null}
          {...CheckboxProps}
        />
      }
      {...LabelProps}
    />
  );
};
