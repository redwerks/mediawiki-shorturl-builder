import { ServerData } from '../../detector/types';
import { Typography } from '@material-ui/core';
import {
  extractArticlePath,
  extractMainPageUrl,
  extractRootPath,
} from '../../extractor';
import { ErrorBox } from '../../error-message';
import { ReactNode, useMemo } from 'react';
import { serverSupportsThumbnails } from '../servers';
export interface InstructionIntroProps {
  serverData: ServerData;
}

export const InstructionIntro = (props: InstructionIntroProps) => {
  const { serverData } = props;
  const { url } = serverData;
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
