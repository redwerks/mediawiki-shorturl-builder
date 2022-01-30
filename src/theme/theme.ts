import { colors, createTheme, ThemeProvider } from '@mui/material';
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
        MuiFormControl: {
          defaultProps: {
            margin: 'normal',
            fullWidth: true,
          },
        },
        MuiTextField: {
          defaultProps: {
            margin: 'normal',
            fullWidth: true,
            size: 'small',
          },
        },
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
