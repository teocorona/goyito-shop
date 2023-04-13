import { CartType } from '../../types/cart';
import { CartState } from '.';

type CartActionType =
  | { type: '[CART] - Load cart from cookies | storage', payload: CartType[] }
  | { type: '[CART] - Update cart', payload: CartType[] }
  | {
    type: '[CART] - Update order summary', payload: {
      numberOfItems: number;
      subTotal: number;
      taxIva: number;
      taxIeps: number;
      total: number;
    }
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[CART] - Load cart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[CART] - Update cart':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[CART] - Update order summary':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}