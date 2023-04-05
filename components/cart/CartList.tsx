import NextLink from "next/link";
import { initialData } from '@database/products';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { ItemCounter } from "@components/ui";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

interface Props {
  editable?: boolean;
}
const productInCart = [
  initialData.products[0],
  initialData.products[3],
  initialData.products[8],
]
export const CartList: FC<Props> = ({ editable = false }) => {

  return (
    <>
      {productInCart.map(product => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`}>
              <Link component='span'>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>Sabor: <strong>{product.variant}</strong></Typography>
              {editable ?
                <ItemCounter />
                : <Typography variant='h4'>3 artíclos</Typography>}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>
            {editable ?
              <Button variant='text' color='error'><DeleteOutline />Borrar</Button>
              : <></>}
          </Grid>

        </Grid>
      ))
      }
    </>
  );
};
