import { styled } from '@mui/material';
import { dark, light } from '@mui/material/styles/createPalette';

export const FeedbackTab = styled('a', {
  name: 'FeedbackTab',
})(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  right: '10%',
  padding: theme.spacing(1.5),
  backgroundColor: '#222',
  color: theme.palette.mode === 'dark' ? light.text.primary : dark.text.primary,
  ...theme.typography.body2,
  lineHeight: 1,
  textDecoration: 'none !important',

  boxShadow:
    '0px 2px 0px 0px #FFFFFF inset, 2px 0px 0px 0px #FFFFFF inset, -2px 0px 0px 0px #FFFFFF inset, 0px -1px 0px 0px #ccc, 1px 0px 0px 0px #ccc, -1px 0px 0px 0px #ccc',

  [theme.breakpoints.up('md')]: {
    bottom: 'auto',
    top: '35%',
    right: 0,
    transformOrigin: '100% 100%',
    transform: 'rotate(-90deg)',
  },
}));
