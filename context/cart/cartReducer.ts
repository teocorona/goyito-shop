import { CartType } from '../../types/cart';
import { CartState } from '.';

type CartActionType =
  | { type: '[CART] - LoadCart from cookies | storage', payload: CartType[] }
  | { type: '[CART] - UpdateCart', payload: CartType[] }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[CART] - LoadCart from cookies | storage':
      return {
        ...state,
      }
    case '[CART] - UpdateCart':
      return {
        ...state,
        cart: [...action.payload]
      }


    default:
      return state
  }
}