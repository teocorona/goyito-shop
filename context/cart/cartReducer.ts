import { AddressType, CartType } from '@types';
import { CartState } from '.';

type CartActionType =
  | { type: '[CART] - Load cart from cookies | storage', payload: CartType[] }
  | { type: '[CART] - Update cart', payload: CartType[] }
  | { type: '[CART] - Load address from cookies | storage', payload: AddressType | undefined }
  | { type: '[CART] - Update address', payload: AddressType | undefined }
  | {
    type: '[CART] - Update order summary', payload: {
      numberOfItems: number;
      subTotal: number;
      taxIva: number;
      taxIeps: number;
      total: number;
    }
  }
  | { type: '[CART] - Order complete' }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[CART] - Load cart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload]
      }
    case '[CART] - Update cart':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[CART] - Update address':
    case '[CART] - Load address from cookies | storage':
      if (!action.payload) return { ...state }
      return {
        ...state,
        address: { ...action.payload }
      }
    case '[CART] - Update order summary':
      return {
        ...state,
        ...action.payload
      }
    case '[CART] - Order complete':
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        taxIeps: 0,
        taxIva: 0,
        total: 0
      }

    default:
      return state
  }
}