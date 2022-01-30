import { Container, styled } from '@mui/material';

export const LayoutContainer = styled(Container, {
  name: 'LayoutContainer',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
