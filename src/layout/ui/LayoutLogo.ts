import { styled } from '@mui/material';

export const LayoutLogo = styled('div', {
  name: 'LayoutLogo',
})(({ theme }) => ({
  gridArea: 'logo',
  margin: '45px 0',
  position: 'relative',

  '& .alpha-icon': {
    background: '#3f9de1',
    boxShadow: '0 0 3px 1px #3f9de1',
  },
  '& .beta-icon': {
    background: '#ea3b2c',
    boxShadow: '0 0 3px 1px #ea3b2c',
  },
  '& .alpha-icon, & .beta-icon': {
    borderRadius: '10px',
    color: '#fff',
    fontSize: '12px',
    padding: '3px 9px',

    position: 'absolute',
    top: '52px',
    left: '150px',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
