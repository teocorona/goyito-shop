import { FC } from 'react';
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ProductType } from '@types';
import { useState } from 'react';
import { useMemo } from 'react';


interface Props {
  product: ProductType
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const productImage = useMemo(() => {
    return isHovered ?
      `products/${product.images[1]}` :
      `products/${product.images[0]}`
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
        <CardActionArea>
          <CardMedia
            component='img'
            className={'fadeIn'}
            image={productImage}
            alt={product.title}
          />
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className='fade-In'>
        <Typography fontWeight={500}>{product.title}</Typography>
        <Typography fontWeight={300}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
