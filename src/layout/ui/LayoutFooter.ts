import { experimentalStyled } from '@material-ui/core/styles';

export const LayoutFooter = experimentalStyled('footer', {
  label: 'LayoutFooter',
})(({ theme }) => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '100%',
  padding: '20px',

  '& ul': {
    display: 'block',
    margin: '0',
  },
  '& li': {
    display: 'inline',
    '&:before': {
      content: '" • "',
    },
    '&:first-child:before': { visibility: 'collapse' },
  },
  '& a': {
    color: '#333',
    textDecoration: 'none',
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
