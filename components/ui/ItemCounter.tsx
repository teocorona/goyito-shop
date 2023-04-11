import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { CartType } from '@types';

interface Props {
  tempCartProduct: CartType,
  setTempCartProduct: Dispatch<SetStateAction<CartType>>
}

export const ItemCounter: FC<Props> = ({ tempCartProduct, setTempCartProduct }) => {
  const handleRemove = () => {
    if(tempCartProduct.quantity <= 1) return
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity: currentProduct.quantity - 1
    }))
  };
  const handleAdd = () => {
    if(tempCartProduct.quantity === tempCartProduct.inStock) return
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity: currentProduct.quantity + 1
    }))
  };
  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={handleRemove}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{tempCartProduct.quantity}</Typography>
      <IconButton onClick={handleAdd}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
