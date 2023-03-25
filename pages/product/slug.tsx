import { ShopLayout } from '@components/layouts';
import { ProductSlideshow, VariantSelector } from '@components/products';
import { ItemCounter } from '@components/ui';
import { initialData } from '@database/products';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { NextPage } from 'next';

const product = initialData.products[5]

const ProductPage: NextPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description} >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>
            <Box sx={{ my: 2 }}>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Cantidad</Typography>
                <ItemCounter />
              </Box>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Sabor</Typography>
                <VariantSelector selectedVariant={product.variant[0]} variants={product.variant} />
              </Box>
            </Box>
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>
            {/* <Chip label='No hay disponibles' color='error' variant='outlined'/> */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripcion:</Typography>
              <Typography variant='body2' dangerouslySetInnerHTML={{ __html: product.description }} />
            </Box>
          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  );
};

export default ProductPage;