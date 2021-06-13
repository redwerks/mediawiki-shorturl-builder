import { colors, createTheme, ThemeProvider } from '@material-ui/core';
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
        background: {
          default: '#f8f8f8',
        },
      },
      components: {
        MuiAlert: {
          styleOverrides: {
            standardWarning: {
              backgroundColor: colors.yellow[100],
            },
          },
        },
      },
    });
  }, []);

  return createElement(ThemeProvider, { theme }, children);
};
