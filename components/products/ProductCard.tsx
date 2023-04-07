import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ProductType } from '@types';
import { useState } from 'react';
import { useMemo } from 'react';


interface Props {
  product: ProductType
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const productImage = useMemo(() => {
    return isHovered ?
      `/products/${product.images[1]}` :
      `/products/${product.images[0]}`
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
      <Card>
        <NextLink href={`/product/slug`} passHref prefetch={false}>
          <Link component='span'>
            <CardActionArea>
              <CardMedia
                component='img'
                className={'fadeIn'}
                image={productImage}
                alt={product.title}
                onLoad={()=> setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fade-In'>
        <Typography fontWeight={500}>{product.title}</Typography>
        <Typography fontWeight={300}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
