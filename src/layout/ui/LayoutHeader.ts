import { experimentalStyled } from '@material-ui/core/styles';

export const LayoutHeader = experimentalStyled('header', {
  label: 'LayoutHeader',
})({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '100%',
  padding: '0 20px',
  borderBottom: '1px solid #ccc',
});
