export interface DetectionErrorExtraData {
  /**
   * Status code for HTTP error
   */
  status?: number;
  /**
   * Status text for HTTP error
   */
  statusText?: string;
  /**
   * meta generator info used by NORSD
   */
  generator?: string | null;
  /**
   * was WordPress API found used by
   */
  wordpress?: boolean;
}

/**
 * MediaWiki server detection errors
 */
export class DetectionError extends Error {
  constructor(
    public code: string,
    message: string,
    public data?: DetectionErrorExtraData
  ) {
    super(message);
    Object.setPrototypeOf(this, DetectionError.prototype);
  }

  toJSON() {
    const { code, message, data } = this;
    return { code, message, data };
  }
}

/**
 * Easily throw a server detection error
 */
export function throwDetectionError(
  code: string,
  message: string,
  data?: DetectionErrorExtraData
): never {
  throw new DetectionError(code, message, data);
}
