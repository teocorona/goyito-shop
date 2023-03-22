import { FC } from 'react';
import { Grid } from '@mui/material';
import { ProductType } from '@types';
import { ProductCard } from './ProductCard';

interface Props {
  products: ProductType[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
