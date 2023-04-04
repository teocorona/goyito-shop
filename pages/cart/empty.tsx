import { ShopLayout } from "@components/layouts";
import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";

const EmptyPage = () => {
  return (
    <ShopLayout title='Carrito vacío' pageDescription='No hay articulos en el carrito de compras' >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: 'column' }}
        textAlign='center'
        gap={6}
      >
        <Box
          display='flex'
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          alignItems='center'
          justifyContent='center'
          gap={2}
        >
          <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
          <Typography variant='h1' component='h1' fontSize={30} fontWeight={300}>
            Carrito de compras vacío
          </Typography>
        </Box>
        <NextLink href={`/`} passHref prefetch={false}>
          <Link component='span'>
            <Typography variant='h1' component='h1' fontSize={40} fontWeight={300} color='blue'>
              Regresar
            </Typography>
          </Link>
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage
