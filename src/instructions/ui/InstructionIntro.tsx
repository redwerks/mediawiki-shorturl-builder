import { Box, Button, TextField, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { ServerData } from '../../detector/types';
import { ErrorBox } from '../../error-message';
import {
  extractArticlePath,
  extractHasRoot,
  extractMainPageUrl,
  extractRootPath,
  extractServerType,
} from '../../extractor';
import { extractIsKnownRoot } from '../../extractor/extractHasRoot';
import { extractReverseDnsNames } from '../../extractor/extractReverseDnsNames';
import { serverSupportsThumbnails } from '../servers';

export interface InstructionIntroProps {
  serverData: ServerData;
  updateServerData: (cb: (serverData: ServerData) => ServerData) => void;
}

export const InstructionIntro = (props: InstructionIntroProps) => {
  const { serverData, updateServerData } = props;
  const { url } = serverData;
  const serverType = extractServerType(serverData);
  const mainPageUrl = extractMainPageUrl(serverData);
  const articlePath = extractArticlePath(serverData)?.replace('/$1', '');
  const rootPath = extractRootPath(serverData);
  const hasThumbnailHandler = useMemo(
    () => serverSupportsThumbnails(serverData),
    [serverData]
  );

  let warning: ReactNode[] = [];
  if (articlePath === rootPath && articlePath === '/wiki') {
    warning.push(
      <ErrorBox
        key="installation-location"
        severity="warning"
        sx={{ mb: 2 }}
        title="Bad Installation Location"
      >
        <p>
          You appear to be trying to configure a wiki for{' '}
          <code>/wiki/Article</code> style urls with it installed at{' '}
          <code>/wiki/</code>. This is actually a common <em>mistake</em>.{' '}
          <code>/wiki/Article</code> style urls are typically done by installing
          your MediaWiki installation either in <code>/w/</code> or directly in
          the root at <code>/</code>, and then setting up short urls.
        </p>
        <p>
          If you setup a wiki using this style of setup you will be creating a
          root url which can cause issues and you will be stuck with ugly edit
          urls. Before you configure short urls we recommend that you return to
          your MediaWiki installation, move and reconfigure the installation in
          either <code>/w/</code> or <code>/</code>, and then come back and
          re-submit your wiki.
        </p>
      </ErrorBox>
    );
  }

  if (!hasThumbnailHandler) {
    warning.push(
      <ErrorBox key="no-thumbnail-handler" severity="warning" sx={{ mb: 2 }}>
        We haven't implemented thumbnail handler rewrites for this server type
        yet. If you wish to experiment with implementing 404 thumbnail handlers
        on your wiki, please get involved with the related{' '}
        <a href="https://github.com/redwerks/mediawiki-shorturl-builder/issues/2">
          GitHub issue
        </a>{' '}
        after you've configured normal short URLs on your wiki.
      </ErrorBox>
    );
  }

  if (serverType === 'apache') {
    const hasRoot = extractHasRoot(serverData);
    const dnsnames = extractReverseDnsNames(serverData);
    if (hasRoot === undefined) {
      warning.push(
        <ErrorBox key="unknown-has-root" severity="warning" sx={{ mb: 2 }}>
          <p>
            You appear to be using Apache. We can give you non-root
            configuration for use in .htaccess files or root configuration you
            can use in Apache config files.
          </p>
          <p>
            We couldn't automatically guess whether you have root access or not.
            Are you are on a shared setup with no root access (e.g. Shared Web
            Hosting) or hosted on a server of your own (VPS, Dedicated, etc...
            whatever) which you have root access to the server on?
          </p>
          <p>We'll give you the proper configuration for that setup.</p>
          <Box
            component="p"
            sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                updateServerData((serverData) => ({
                  ...serverData,
                  hasroot: false,
                }))
              }
            >
              I don't have root access.
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                updateServerData((serverData) => ({
                  ...serverData,
                  hasroot: true,
                }))
              }
            >
              I have root access to the server config.
            </Button>
          </Box>
        </ErrorBox>
      );
    } else if (
      hasRoot === true &&
      dnsnames.length > 0 &&
      !extractIsKnownRoot(serverData)
    ) {
      const editUrl = new URL(
        'https://github.com/redwerks/mediawiki-shorturl-builder/edit/main/src/known_root_reversedns.tex'
      );
      editUrl.searchParams.set(
        'message',
        `Add known root pattern to match ${new URL(serverData.url).hostname}`
      );
      editUrl.searchParams.set(
        'description',
        `Added a pattern to match the reversedns used by ${
          serverData.url
        }\n\nReverse DNS:\n${dnsnames
          .map((dnsname) => `- ${dnsname}`)
          .join('\n')}`
      );

      warning.push(
        <ErrorBox key="unknown-is-known-root" severity="info" sx={{ mb: 2 }}>
          <p>
            We couldn't automatically guess that you have root access. If you
            don't mind, you can take a moment to submit your reverse dns
            names(s) so we can automatically detect this in the future.
          </p>
          <p>
            You can edit our known_root_reversedns file on GitHub to include a
            pattern that will match one of your reverse DNS names.
          </p>

          <TextField
            name="dnsnames"
            inputProps={{ readOnly: true }}
            label="Your reverse DNS name(s)"
            value={dnsnames.join('\n')}
          />
          <Button
            variant="outlined"
            component="a"
            href={editUrl.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit known_root_reversedns
          </Button>
        </ErrorBox>
      );
    }
  }

  return (
    <>
      {warning}
      <Typography variant="body1">
        These instructions can be used to configure the wiki at{' '}
        <a href={url} target="_blank" rel="noopener noreferrer nofollow">
          {url}
        </a>{' '}
        with the article path "<code>{extractArticlePath(serverData)}</code>"
        giving you urls like{' '}
        <a href={mainPageUrl} rel="noopener noreferrer nofollow">
          {mainPageUrl}
        </a>
        . If you want a different article path you can fill in a new one here.
      </Typography>
    </>
  );
};
