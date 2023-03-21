import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from 'components/components/layouts';

const Custom404: NextPage = () => {
  return (
    <ShopLayout title='Pagina no encontrada' pageDescription='status 404' >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='calc(100vh - 200px)'
        sx={{flexDirection: {xs: 'column', md: 'row'}}}
        textAlign='center'
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={300}>
          404
        </Typography>
        <Typography variant='h1' fontSize={80} fontWeight={100} marginX={2} marginTop={-2}  sx={{ display: {xs: 'none', md: 'flex'}}}>
          |
        </Typography>
        <Typography variant='h1' fontSize={50} fontWeight={100}>
          Página no encontrada
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;