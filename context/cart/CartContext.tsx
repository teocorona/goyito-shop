import { createContext } from 'react';
import { CartType, AddressType } from '@types';

interface ContextProps {
  cart: CartType[],
  isLoaded: boolean,
  numberOfItems: number;
  subTotal: number;
  taxIva: number;
  taxIeps: number;
  total: number;
  address?: AddressType
  addProductToCart: (product: CartType) => void
  updateProductCartQuantity: (product: CartType, quantity: number) => void
  deleteCartItem: (product: CartType) => void
  updateAddress: (address: AddressType) => void,
  createOrder: () => Promise<{hasError: boolean; message: string;}>
}

export const CartContext = createContext({} as ContextProps) 