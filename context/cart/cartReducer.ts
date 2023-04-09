import { CartType } from '../../types/cart';
import { CartState } from '.';

type CartActionType =
  | { type: '[CART] - LoadCart from cookies | storage', payload: CartType[] }
  | { type: '[CART] - AddProduct', payload: CartType }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[CART] - LoadCart from cookies | storage':
      return {
        ...state,
      }

    default:
      return state
  }
}