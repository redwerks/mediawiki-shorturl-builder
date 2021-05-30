import { Container } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';

export const LayoutContainer = experimentalStyled(Container, {
  label: 'LayoutContainer',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
