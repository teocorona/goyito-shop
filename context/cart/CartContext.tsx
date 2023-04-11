import { createContext } from 'react';
import { CartType } from '@types';

interface ContextProps {
  cart: CartType[],
  addProductToCart: (product: CartType) => void
}

export const CartContext = createContext({} as ContextProps) 