import { FC, useReducer } from 'react'
import { CartType } from '@types'
import { CartContext, cartReducer } from '.'

export interface CartState {
  cart: CartType[],
  addProductToCart: (product: CartType) => void
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  addProductToCart: (product: CartType) => { }
}

interface Props {
  children?: React.ReactNode
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: CartType) => {
    const productInCart = state.cart.some(item => (item.slug === product.slug && item.variant === product.variant))
    if (!productInCart) return dispatch({ type: '[CART] - UpdateCart', payload: [...state.cart, product] })
    const updatedProducts = state.cart.map(item => {
      if (item.slug !== product.slug && item.slug !== product.slug) return item;
      item.quantity += product.quantity
      return item
    })
    dispatch({ type: '[CART] - UpdateCart', payload: updatedProducts })
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart
    }}>
      {children}
    </CartContext.Provider>
  )
};