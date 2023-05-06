import { FC } from 'react';
import NextLink from "next/link";
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from "@components/ui";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useContext } from "react"
import { CartContext } from "@context"
import { CartType } from "../../types/cart";
import { OrderItemType } from '../../types/order';
interface Props {
  editable?: boolean;
  products?: OrderItemType[]
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart = [] } = useContext(CartContext)
  const productList = products ? products : cart
  return (
    <>
      {productList.map((p) =>  <CartProduct key={p.slug} product={p} editable={editable} />)}
    </>
  );
};

interface CartProductProps {
  product: CartType,
  editable: boolean
}
const CartProduct: FC<CartProductProps> = ({ product, editable }) => {
  const { updateProductCartQuantity, deleteCartItem } = useContext(CartContext)
  const onUpdatedQuantity = (quantity: number) => {
    updateProductCartQuantity(product, quantity)
  }
  const onDeleteItem = () => {
    deleteCartItem(product)
  }
  return (
    <Grid container key={product.slug} spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={3}>
        <NextLink href={`/product/${product.slug}`}>
          <Link component='span'>
            <CardActionArea>
              <CardMedia
                image={product.image}
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
          {editable ? (
            <ItemCounter
              currentValue={product.quantity}
              updatedQuantity={onUpdatedQuantity}
              maxValue={product.inStock || 100}
            />
          ) : (
            <Typography variant='subtitle1'>
              {product.quantity} {' '}
              {product.quantity === 1 ? 'pieza' : 'piezas'}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
        <Typography variant='subtitle1'>${product.price}</Typography>
        {editable ?
          <Button variant='text' color='error' onClick={onDeleteItem}><DeleteOutline />Borrar</Button>
          : <></>}
      </Grid>

    </Grid>
  );
}

