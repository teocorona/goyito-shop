import { FC, useReducer } from 'react'
import { CartType } from '@types'
import { CartContext, cartReducer } from '.'

export interface CartState {
    cart: CartType[]
 }

 const CART_INITIAL_STATE: CartState = {
     cart: []
 }

 interface Props {
     children?: React.ReactNode
 }

 export const CartProvider: FC<Props> = ({ children }) => {

     const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    //  const toggleMenu = () => {
    //    dispatch({type: '[CART] - ToggleSidemenu'})
    //  };

     return (
         <CartContext.Provider value={{
             ...state,

         }}>
             {children}
         </CartContext.Provider>
     )
};