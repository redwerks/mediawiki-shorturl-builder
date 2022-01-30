import { Container } from '@mui/material';
import { experimentalStyled } from '@mui/material/styles';

export const LayoutContainer = experimentalStyled(Container, {
  label: 'LayoutContainer',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
