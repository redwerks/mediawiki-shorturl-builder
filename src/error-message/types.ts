import { ReactNode } from 'react';

/**
 * Title and message for an error box
 */
export interface ErrorBoxInfo {
  title: ReactNode;
  message?: ReactNode;
}
