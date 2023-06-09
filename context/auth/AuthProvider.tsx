import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, useEffect, useReducer } from 'react'
import { goyitoApi } from '../../axios-api';
import { UserType } from '../../types/user';
import { AuthContext, authReducer } from './'
import { useSession, signOut } from "next-auth/react";


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
  const router = useRouter()

  const { data, status } = useSession()

  useEffect(() => {
    if(status === 'authenticated'){
      dispatch({type: '[AUTH] - Login', payload:data?.user as UserType})
    }
  }, [status, data])

  // useEffect(() => {
  //   validateToken()
  // }, [])
  // const validateToken = async () => {
  //   if (!Cookies.get('token')) return
  //   try {
  //     const { data } = await goyitoApi.get('/user/token');
  //     const { token, user } = data
  //     Cookies.set('token', token);
  //     dispatch({ type: '[AUTH] - Login', payload: user })
  //   } catch (error) {
  //     Cookies.remove('token');
  //   }
  // }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await goyitoApi.post('/user/login', { email, password });
      const { token, user } = data
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user })
      return true;
    } catch (error) {
      return false;
    }
  }

  const registerUser = async (name: string, email: string, password: string):
    Promise<{ hasError: boolean, message?: string }> => {
    try {
      const { data } = await goyitoApi.post('/user/register', { name, email, password });
      const { token, user } = data
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario'
      }
    }
  }

  const logoutUser = async () => {
    Cookies.remove('cart');
    Cookies.remove('address');
    signOut();
    // Cookies.remove('token'); // ya lo hace next aiuth
    // router.reload() //ya lo hace next auth
    dispatch({ type: '[AUTH] - Logout' })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      registerUser,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
};