import { styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const MediaBoxList = styled('ul', { name: 'MediaBox', slot: 'List' })(
  ({ theme }) => ({
    display: 'inline-block',
    width: '100%',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    marginBottom: theme.spacing(2),
  })
);

const MediaBoxLi = styled('li', { name: 'MediaBox', slot: 'Li' })(
  ({ theme }) => ({
    display: 'grid',

    gridTemplateAreas: ['header', 'body', 'thumb']
      .map((line) => `"${line}"`)
      .join(' '),
    gridTemplateColumns: '1fr',

    marginTop: theme.spacing(3),
    '&:first-child': {
      marginTop: 0,
    },

    '& .thumb': {
      gridArea: 'thumb',
      minWidth: 0,
      maxWidth: '100%',
      height: 'auto',
      marginBottom: theme.spacing(1),
    },

    '& .header': {
      gridArea: 'header',
      marginBottom: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    '& .body': {
      gridArea: 'body',
      margin: 0,
    },

    [theme.breakpoints.up('sm')]: {
      gridTemplateAreas: ['thumb header', 'thumb body']
        .map((line) => `"${line}"`)
        .join(' '),
      gridTemplateColumns: 'auto 1fr',
      gap: `0 ${theme.spacing(3)}`,

      '& .thumb': {
        width: 150,
        marginBottom: 0,
      },
    },
  })
);

export interface MediaBoxProps {
  thumb: string;
  no: number;
  title: string;
  children?: ReactNode;
}

export const MediaBox = (props: MediaBoxProps) => {
  const { thumb, no, title, children } = props;

  return (
    <MediaBoxLi className="mediabox">
      <img className="thumb" src={thumb} alt="" />
      <Typography className="header" component="h2" variant="h6">
        {no}. {title}
      </Typography>
      <p className="body">{children}</p>
    </MediaBoxLi>
  );
};
