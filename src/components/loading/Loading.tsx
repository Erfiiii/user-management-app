import { Box, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function Loading(props: Props) {
  return (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress disableShrink />
    </Box>
  );
}
