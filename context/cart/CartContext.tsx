import { createContext } from 'react';
import { CartType } from '@types';

interface ContextProps {
  cart: CartType[]
}

export const CartContext = createContext({} as ContextProps) 