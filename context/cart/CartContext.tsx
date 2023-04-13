import { createContext } from 'react';
import { CartType } from '@types';

interface ContextProps {
  cart: CartType[],
  numberOfItems: number;
  subTotal: number;
  taxIva: number;
  taxIeps: number;
  total: number;
  addProductToCart: (product: CartType) => void
  updateProductCartQuantity: (product: CartType, quantity: number) => void
  deleteCartItem: (product: CartType) => void
}

export const CartContext = createContext({} as ContextProps) 