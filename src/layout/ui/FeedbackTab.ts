import { experimentalStyled } from '@material-ui/core/styles';

export const FeedbackTab = experimentalStyled('a', {
  label: 'FeedbackTab',
})(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  right: '10%',
  padding: '10px 10px',
  backgroundColor: '#222',
  color: '#fff',
  fontSize: 14,
  fontWeight: 500,
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
