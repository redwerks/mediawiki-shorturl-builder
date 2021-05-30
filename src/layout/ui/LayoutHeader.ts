import { experimentalStyled } from '@material-ui/core/styles';

export const LayoutHeader = experimentalStyled('header', {
  label: 'LayoutHeader',
})(({ theme }) => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '100%',
  padding: `0 ${theme.spacing(2)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
