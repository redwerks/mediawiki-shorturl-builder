import {
  Box,
  CssBaseline,
  GlobalStyles,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ReactNode } from 'react';
import { LayoutBody, LayoutFooter, LayoutHeader, LayoutLogo } from './ui';
import { FeedbackTab } from './ui/FeedbackTab';
import { LayoutContainer } from './ui/LayoutContainer';

export interface LayoutProps {
  children?: ReactNode;
}

/**
 * Core site layout
 */
export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const isAlpha = process.env.REACT_APP_BUILD_VERSION === 'alpha';
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <LayoutContainer maxWidth="md">
        <LayoutHeader id="header">
          <LayoutLogo id="logo">
            <Box component="a" href="/">
              <img alt="Redwerks" src="/resources/redwerks-blog-logo.png" />
              {isAlpha ? (
                <span className="alpha-icon">αlpha</span>
              ) : (
                <span className="beta-icon">βeta</span>
              )}
            </Box>
          </LayoutLogo>
          <Typography component="h1" variant="h5" sx={{ gridArea: 'wordmark' }}>
            MediaWiki ShortURL Builder
          </Typography>
        </LayoutHeader>
        <LayoutBody id="body">{children}</LayoutBody>
        <LayoutFooter id="footer">
          <ul>
            <li>
              <MuiLink color="text.secondary" href="http://redwerks.org/">
                Redwerks.org
              </MuiLink>
            </li>
            <li>
              <MuiLink color="text.secondary" href="http://blog.redwerks.org/">
                Redwerks Blog
              </MuiLink>
            </li>
          </ul>
        </LayoutFooter>
      </LayoutContainer>
      <FeedbackTab
        id="feedback_tab"
        href="https://productpains.com/product/mediawiki-short-url-builder/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Feedback
      </FeedbackTab>
    </>
  );
};
