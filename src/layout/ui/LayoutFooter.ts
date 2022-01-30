import { experimentalStyled } from '@mui/material/styles';

export const LayoutFooter = experimentalStyled('footer', {
  label: 'LayoutFooter',
})(({ theme }) => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '100%',
  padding: theme.spacing(2),

  '& ul': {
    display: 'block',
    margin: 0,
    padding: 0,
  },
  '& li': {
    display: 'inline',
    '&:before': {
      content: '" • "',
    },
    '&:first-child:before': { visibility: 'collapse' },
  },

  [theme.breakpoints.down('sm')]: {
    '& li': {
      display: 'block',
      float: 'none',

      '&:before': {
        content: '"• "',
      },
      '&:first-child:before': {
        visibility: 'visible',
      },
    },
  },
}));
