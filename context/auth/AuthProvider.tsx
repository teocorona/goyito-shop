import { FC, useReducer } from 'react'
import { UserType } from '../../types/user';
import { AuthContext, authReducer } from './'

export interface AuthState {
   isLoggedIn: boolean;
   user?: UserType;
 }

 const AUTH_INITIAL_STATE: AuthState = {
     isLoggedIn: false,
     user: undefined,
 }

 interface Props {
     children?: React.ReactNode
 }

 export const AuthProvider: FC<Props> = ({ children }) => {

     const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

     return (
         <AuthContext.Provider value={{
             ...state,
         }}>
             {children}
         </AuthContext.Provider>
     )
};