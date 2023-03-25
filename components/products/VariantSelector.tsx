import { FC } from 'react';
import { variantType } from '@types';
import { Box, Button } from '@mui/material';

interface Props {
  selectedVariant: variantType;
  variants: variantType[];
}

export const VariantSelector: FC<Props> = ({ selectedVariant, variants }) => {
  return (
    <Box>
      {
        variants.map(variant => (
          <Button
            key={variant}
            size='small'
            color={ selectedVariant === variant ? 'primary' : 'secondary'}
            className='-btn'
          >
            {variant.toUpperCase()}
          </Button>
        ))
      }
    </Box >
  );
};
