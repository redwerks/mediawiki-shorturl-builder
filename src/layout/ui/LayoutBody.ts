import { experimentalStyled } from '@material-ui/core/styles';

export const LayoutBody = experimentalStyled('div', {
  label: 'LayoutBody',
})({
  padding: '0 20px',
  margin: '22px auto 0',
  borderBottom: '1px solid #bfbfbf',
  fontSize: '.9em',

  '& header': {
    '& h1': {
      fontSize: '2em',
      color: '#333',
      letterSpacing: '0.25px',
    },
    '& h1 a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },

  '& footer': {
    clear: 'both',
    margin: '1em 0',

    '& dl': {
      display: 'block',
    },
    '& dt, & dd, & ul, & li': { display: 'inline', margin: 0 },

    '& dt:before': { content: '" | "' },
    '& dt:first-of-type:before': { visibility: 'collapse' },

    '& dt:after': {
      content: '"',
    },
    '& li:before': { content: '", "' },
    '& li:first-child:before': { visibility: 'collapse' },
  },

  '& & > :last-child': {
    marginBottom: '22px',
  },
});
