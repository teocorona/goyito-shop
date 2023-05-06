import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import { ProductType } from '@types';
import { useState } from 'react';
import { useMemo } from 'react';
import { isAbsolute } from 'path';


interface Props {
  product: ProductType
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const productImage = useMemo(() => {
    return isHovered ?
      product.images[1] :
      product.images[0]
  }, [isHovered, product.images])
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card sx={{ position: 'relative' }}>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link component='span'>
            <CardActionArea>
              {(product.inStock < 10 && product.inStock > 0) ? (
                < Chip
                  color='warning'
                  label='Ultimas piezas'
                  sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                />
              ) : product.inStock <= 0 ? (
                <Chip
                  color='primary'
                  label='No hay disponibles'
                  sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                />
              ) : null}
              <CardMedia
                component='img'
                className={'fadeIn'}
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      {/* <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fade-In'> */}
      <Box sx={{ mt: 1 }} className='fade-In'>
        <Typography fontWeight={500}>{product.title}</Typography>
        <Typography fontWeight={300}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
