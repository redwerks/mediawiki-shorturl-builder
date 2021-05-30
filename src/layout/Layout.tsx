import { ReactNode } from 'react';

export interface LayoutProps {
  children?: ReactNode;
}

/**
 * Core site layout
 */
export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const isAlpha = process.env.REACT_APP_BUILD_VERSION === 'alpha';

  return (
    <>
      <header id="header">
        <div id="logo">
          <h1>MediaWiki ShortURL Builder</h1>
          <a href="/">
            <img alt="Redwerks" src="/resources/redwerks-blog-logo.png" />
            {isAlpha ? (
              <span className="alpha-icon">αlpha</span>
            ) : (
              <span className="beta-icon">βeta</span>
            )}
          </a>
        </div>
      </header>
      <div id="body">{children}</div>
      <footer id="footer">
        <ul>
          <li>
            <a href="http://redwerks.org/">Redwerks.org</a>
          </li>
          <li>
            <a href="http://blog.redwerks.org/">Redwerks Blog</a>
          </li>
        </ul>
      </footer>
      <a
        id="feedback_tab"
        href="https://productpains.com/product/mediawiki-short-url-builder/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Feedback
      </a>
    </>
  );
};
