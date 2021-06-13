import { DetectionErrorExtraData } from '../detector';

/**
 * An unexpected server error
 */
export interface ServerError {
  message: string;
  error: any;
}

/**
 * A detection error from the server
 */
export interface ServerDetectionError {
  message: string;
  code: string;
  data?: DetectionErrorExtraData;
}
