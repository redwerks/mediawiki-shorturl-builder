import { ServerData } from '../../detector/types';
import { Typography } from '@material-ui/core';
import { extractArticlePath, extractMainPageUrl } from '../../extractor';
export interface InstructionIntroProps {
  serverData: ServerData;
}

export const InstructionIntro = (props: InstructionIntroProps) => {
  const { serverData } = props;
  const { url } = serverData;
  const mainPageUrl = extractMainPageUrl(serverData);

  return (
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
  );
};
