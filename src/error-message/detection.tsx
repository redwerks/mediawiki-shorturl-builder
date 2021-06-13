import { ReactNode } from 'react';
import { ServerDetectionError } from '../api/error';
import { DetectionErrorExtraData } from '../detector';
import { ErrorBoxInfo } from './types';

interface DetectionErrorClassGroup {
  title: ReactNode;
  body?: (message: ReactNode) => ReactNode;
  messages: {
    [code: string]: ReactNode | ((data: DetectionErrorExtraData) => ReactNode);
  };
}
interface DetectionErrorClassRaw {
  code: string;
  error: (data: DetectionErrorExtraData) => ErrorBoxInfo;
}
type DetectionErrorClass = DetectionErrorClassGroup | DetectionErrorClassRaw;

const detectionErrorClasses: DetectionErrorClass[] = [
  // BADINPUT
  {
    title: 'Sorry, there appears to be an issue with the input provided.',
    body: (message) => (
      <>
        {message}
        <p>Please provide a URL pointing to a MediaWiki installation.</p>
      </>
    ),
    messages: {
      URL_REQUIRED: <p>No URL was provided.</p>,
      URL_INVALID: <p>The URI provided does not appear to be a valid URL.</p>,
      URL_INVALID_PROTOCOL: (
        <p>The URI provided is not a valid HTTP or HTTPS URL.</p>
      ),
    },
  },
  // BADSERVER
  {
    title:
      'Sorry, there appears to be an issue with the server belonging to this website.',
    body: (message) => (
      <>
        <p>
          We had issues communicating with this url. Either the website here
          does not exist or is currently broken.
        </p>
        <p>{message}</p>
        <p>
          The ShortURL tool functions by examining an already installed
          MediaWiki installation and then providing the config you need to
          enable short URLs.
        </p>
        <p>Please provide a URL pointing to a MediaWiki installation.</p>
      </>
    ),
    messages: {
      SERVER_ERROR: (data) => (
        <p>
          The server responded with a {data.status} {data.statusText} response.
        </p>
      ),
      NETWORK_UNAVAILABLE: <p>The server was unreachable over the network.</p>,
      SERVER_NOEXIST: <p>The server does not appear to exist.</p>,
      SERVER_REFUSED: <p>The server refused the connection.</p>,
      SERVER_TIMEOUT: (
        <p>We timed out while waiting for the server to respond.</p>
      ),
      SERVER_REDIRECT: (
        <p>
          Too many redirects were encountered while trying to fetch information
          on the wiki.
        </p>
      ),
      RES_NOT_HTML: <p>The server did not respond with a HTML document.</p>,
    },
  },
  // PRIVATEWIKI
  {
    title: "Sorry, this tool doesn't work on private wikis.",
    messages: {
      PRIVATEWIKI: (
        <>
          <p>
            When your wiki is set as private public information in the API
            becomes unavailable and as a result we cannot fetch the information
            we need to generate config for the wiki.
          </p>
          <p>
            If you wish to use the tool on your wiki you'll have to temporarily
            make your wiki publicly readable.
          </p>
        </>
      ),
    },
  },
  // NORSD
  {
    code: 'NORSD',
    error: ({ generator }) => {
      const m = generator && /^(.+)?MediaWiki\s*(\d+)\.(\d+)/.exec(generator);
      if (m) {
        const [lead, major, minor] = m;
        if (lead) {
          // Something wierd with the MediaWiki generator
          return {
            title: "Sorry, we couldn't find your wiki's API.",
            message: (
              <>
                <p>
                  We could not find a <code>rel=EditRSD</code> in the url you
                  specified. We did find a generator tag declaring an instance
                  of MediaWiki, however we could not make sense of the version
                  information within it.
                </p>
                <p>
                  If you've removed the EditRSD from your MediaWiki installation
                  or disabled the API we cannot help configure your wiki.
                </p>
              </>
            ),
          };
        } else if (parseInt(major) > 1 || parseInt(minor) >= 17) {
          // Good version of MediaWiki, but no API
          return {
            title: "Sorry, we couldn't find your wiki's API.",
            message: (
              <>
                <p>
                  We could not find a <code>rel=EditRSD</code> in the url you
                  specified however we found a generator declaring an acceptable
                  version of MediaWiki.
                </p>
                <p>
                  If you've removed the EditRSD from your MediaWiki installation
                  or disabled the API we cannot help configure your wiki.
                </p>
              </>
            ),
          };
        } else {
          // Version of MediaWiki too old to find the API
          return {
            title: 'Please upgrade your MediaWiki installation.',
            message: (
              <>
                <p>
                  Sorry, this tool needs metadata that was added to MediaWiki
                  1.17 to run.
                </p>
                <p>
                  Please upgrade to the latest version of MediaWiki before using
                  this tool to help configure your short urls.
                </p>
              </>
            ),
          };
        }
      } else {
        // Probably not a MediaWiki installation
        // Can't find generator info / cannot find MediaWiki in generator
        return {
          title: 'Sorry, this does not look like a wiki.',
          message: (
            <>
              <p>
                We could not find a <code>rel=EditRSD</code> in the url you
                specified nor could we find a generator meta item with MediaWiki
                information in it.
              </p>
              <p>
                Are you sure you gave the url to your MediaWiki installation? If
                you gave the correct url your install may be customized or
                broken in a way that prevents us from detecting the location of
                your wiki's api and coming up with shorturl configuration for
                you.
              </p>
            </>
          ),
        };
      }
    },
  },
  // RSD_INVALIDXML
  {
    title: 'Encountered invalid XML while trying to find the API.',
    messages: {
      RSD_INVALIDXML: (
        <p>
          We fetched the RSD your wiki points at, however we found invalid XML
          when trying to read the document.
        </p>
      ),
    },
  },
  // RSD_INVALID
  {
    title: 'Entountered an invalid RSD document while trying to find the API.',
    messages: {
      RSD_EMPTY: (
        <p>
          We fetched the RSD URI your wiki points at, however we did not find a
          RSD document there.
        </p>
      ),
      RSD_INVALID: (
        <p>
          We fetched the RSD your wiki points at, however we did not find a
          valid RSD document when trying to read it.
        </p>
      ),
    },
  },
  // RSD_NOAPI
  {
    code: 'RSD_NOAPI',
    error: ({ wordpress }) => {
      if (wordpress) {
        return {
          title: 'Hold it there Blogger!',
          message: (
            <>
              <p>
                We found a <code>rel=EditRSD</code> for your wiki, however the
                resulting document did not declare the location of a MediaWiki
                installation's API point in it. We did however find a WordPress
                API declaration.
              </p>
              <p>
                It looks like you gave us the url to your blog instead of your
                wiki. Please use WordPress' built in shorturl configuration or
                come back with the url of a MediaWiki installation.
              </p>
            </>
          ),
        };
      }

      return {
        title: 'Sorry, this does not look like a wiki.',
        message: (
          <>
            <p>
              We found a <code>rel=EditRSD</code> for your wiki, however the
              resulting document did not declare the location of a MediaWiki
              installation's API point in it.
            </p>
            <p>
              Are you sure you gave the url to your MediaWiki installation? If
              you gave the correct url your install may be customized or broken
              in a way that prevents us from detecting the location of your
              wiki's api and coming up with shorturl configuration for you.
            </p>
          </>
        ),
      };
    },
  },
  // API_RESPONSE_INVALID
  {
    title:
      "Encountered an API error while trying to read your wiki's settings.",
    messages: {
      API_RESPONSE_INVALID: (
        <p>
          We found your MediaWiki installation's API however we encountered an
          error while trying to read your wiki's site info.
        </p>
      ),
    },
  },
];

/**
 * Get a title and message for a detection error
 */
export function getDetectionError(error: ServerDetectionError): ErrorBoxInfo {
  for (const detectionErrorClass of detectionErrorClasses) {
    if ('code' in detectionErrorClass) {
      if (detectionErrorClass.code === error.code) {
        return detectionErrorClass.error(error.data ?? {});
      }
    } else {
      const { title, body, messages } = detectionErrorClass;
      if (messages.hasOwnProperty(error.code)) {
        let message = messages[error.code];
        message =
          typeof message === 'function' ? message(error.data ?? {}) : message;
        if (body) message = body(message);

        return { title, message };
      }
    }
  }

  return {
    // @todo severity=error?
    title: 'Unexpected detection error',
    message:
      'An unexpected error prevented us from detecting a MediaWiki installation at the URL provided.',
  };
}
