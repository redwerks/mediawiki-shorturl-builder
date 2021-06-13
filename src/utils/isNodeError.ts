/**
 * Check if a variable is an Error object with node's code property
 */
export function isNodeError(
  error: unknown
): error is InstanceType<ErrorConstructor> & NodeJS.ErrnoException;
export function isNodeError<E extends ErrorConstructor>(
  error: unknown,
  ErrorType: E
): error is InstanceType<E> & NodeJS.ErrnoException;
export function isNodeError<E extends ErrorConstructor>(
  error: unknown,
  ErrorType?: E
) {
  return error instanceof (ErrorType ?? Error) && 'code' in error;
}

/**
 * Check if a variable is an Error object for a specific syscall
 */
export function isSysCallError(
  error: unknown,
  syscall: string,
  code: string
): error is InstanceType<ErrorConstructor> & NodeJS.ErrnoException {
  return isNodeError(error) && error.syscall === syscall && error.code === code;
}
