import { createTheme, ThemeProvider } from '@material-ui/core';
import { createElement, ReactNode, useMemo } from 'react';

export interface ThemeRootProps {
  children?: ReactNode;
}

export const ThemeRoot = (props: ThemeRootProps) => {
  const { children } = props;

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: 'light',
      },
    });
  }, []);

  return createElement(ThemeProvider, { theme }, children);
};