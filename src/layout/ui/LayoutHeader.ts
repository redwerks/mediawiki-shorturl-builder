import { styled } from '@mui/material';

export const LayoutHeader = styled('header', {
  name: 'LayoutHeader',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `auto 1fr auto`,
  gridTemplateAreas: '"logo . wordmark"',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: `0 ${theme.spacing(2)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
