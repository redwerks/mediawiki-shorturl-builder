import { useIsSubmitting } from 'formik';

/**
 * Check whether a field is disabled explicitly or by the form submitting
 */
export function useFieldDisabled(disabledProp?: boolean) {
  const isSubmitting = useIsSubmitting();

  return disabledProp ?? isSubmitting;
}
