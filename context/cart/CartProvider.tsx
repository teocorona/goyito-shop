import { FC, useEffect, useReducer, useRef } from 'react'
import { CartType, AddressType } from '@types'
import { CartContext, cartReducer } from '.'
import Cookie from 'js-cookie'

export interface CartState {
  cart: CartType[],
  isLoaded: boolean,
  numberOfItems: number;
  subTotal: number;
  taxIva: number;
  taxIeps: number;
  total: number;
  address?: AddressType
}



const CART_INITIAL_STATE: CartState = {
  cart: [],
  isLoaded: false,
  numberOfItems: 0,
  subTotal: 0,
  taxIva: 0,
  taxIeps: 0,
  total: 0,
  address: undefined
}

interface Props {
  children?: React.ReactNode
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
  const isReloading = useRef(true);

  useEffect(() => {
    try {
      const cookieCart: CartType[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: '[CART] - Load cart from cookies | storage', payload: cookieCart })
    } catch (error) {
      dispatch({ type: '[CART] - Load cart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    try {
      const cookieAddress: AddressType = Cookie.get('address') ? JSON.parse(Cookie.get('address')!) : undefined
      dispatch({ type: '[CART] - Load address from cookies | storage', payload: cookieAddress })
    } catch (error) {
      dispatch({ type: '[CART] - Load address from cookies | storage', payload: undefined })
    }
  }, [])

  useEffect(() => {
    if (isReloading.current) {
      isReloading.current = false;
    } else {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, curr) => (curr.quantity * curr.price) + prev, 0)
    const taxIva = subTotal * Number(process.env.NEXT_PUBLIC_TAX_IVA || 0);
    const taxIeps = subTotal * Number(process.env.NEXT_PUBLIC_TAX_IEPS || 0);
    const total = subTotal + taxIva + taxIeps;
    const orderSummary = {
      numberOfItems,
      subTotal,
      taxIva,
      taxIeps,
      total
    }
    dispatch({ type: '[CART] - Update order summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: CartType) => {
    const productInCart = state.cart.some(item => (item.slug === product.slug && item.variant === product.variant))
    if (!productInCart) return dispatch({ type: '[CART] - Update cart', payload: [...state.cart, product] })
    const updatedProducts = state.cart.map(item => {
      if (item.slug !== product.slug && item.variant !== product.variant) return item;
      item.quantity += product.quantity
      return item
    })
    dispatch({ type: '[CART] - Update cart', payload: updatedProducts })
  };

  const updateProductCartQuantity = (product: CartType, quantity: number) => {
    const updatedProducts = state.cart.map(item => {
      if (item.slug !== product.slug && item.variant !== product.variant) return item;
      item.quantity = quantity
      return item
    })
    dispatch({ type: '[CART] - Update cart', payload: updatedProducts })
  };
  
  const deleteCartItem = (product: CartType) => {
    console.log(product)
    const updatedProducts = state.cart.filter(item => (!(item.slug === product.slug && item.variant === product.variant)))
    dispatch({ type: '[CART] - Update cart', payload: updatedProducts })
  };
  
  const updateAddress= (address: AddressType) => {
    dispatch({ type: '[CART] - Update address', payload: address })
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateProductCartQuantity,
      deleteCartItem,
      updateAddress
    }}>
      {children}
    </CartContext.Provider>
  )
};