import { useContext, useEffect, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { ShopLayout } from '@components/layouts';
import { ProductSlideshow, VariantSelector } from '@components/products';
import { ItemCounter } from '@components/ui';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { CartType, ProductType } from '@types';
import { getAllProductsSlugs, getProductBySlug } from '@database';
import { CartContext } from '../../context/cart';
interface Props {
  product: ProductType
}

const ProductPage: NextPage<Props> = (props) => {
  const { product } = props
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<CartType>({
    _id: product._id,
    category: product.category,
    variant: product.variant[0],
    image: product.images[0],
    inStock: product.inStock,
    netWt: product.netWt,
    price: product.price,
    slug: product.slug,
    title: product.title,
    quantity: 1
  })

  const onUpdatedQuantity = (quantity: number) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const addToCart = () => {
    addProductToCart(tempCartProduct)
  };
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
                <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdatedQuantity}
                maxValue={product.inStock}
                />
              </Box>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Sabor</Typography>
                <VariantSelector selectedVariant={product.variant[0]} variants={product.variant} />
              </Box>
            </Box>
            {product.inStock > 0 ? (
              <Button color='secondary' className='circular-btn' onClick={addToCart}>
                Agregar al carrito
              </Button>
            ) : (
              <Chip label='No hay disponibles' color='error' variant='outlined' />
            )}
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


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const product = await getProductBySlug(`${ctx.query.slug || ''}`)
//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }
//   return {
//     props: {
//       product
//     }
//   }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await getAllProductsSlugs()
  const paths = data?.map(s => ({ params: { 'slug': s.slug } })) || []
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const product = await getProductBySlug(`${'pina_60g'}`)
  const product = await getProductBySlug(`${ctx.params?.slug || ''}`)
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    },
    revalidate: 86400
  }
}