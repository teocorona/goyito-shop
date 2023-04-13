import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  currentValue: number,
  maxValue: number,
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {
  const handleAddOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      return updatedQuantity(currentValue - 1)
    }
    if (currentValue >= maxValue) return
    return updatedQuantity(currentValue + 1)
  };
  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => handleAddOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
      <IconButton onClick={() => handleAddOrRemove(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
