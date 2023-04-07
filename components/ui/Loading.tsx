import { Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  
}

export const Loading: FC<Props> = () => {
  return (
    <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='calc(100vh - 500px)'
        sx={{flexDirection: 'column'}}
        textAlign='center'
        gap={2}
      >
        <Typography variant='h2' fontSize={20} fontWeight={100}>
          Cargando...
        </Typography>
        <CircularProgress thickness={1}/>
      </Box>
  );
};
