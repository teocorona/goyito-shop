import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, useEffect, useReducer } from 'react'
import { goyitoApi } from '../../api';
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

  useEffect(() => {
    validateToken()
  }, [])

  const validateToken = async () => {
    try {
      const { data } = await goyitoApi.get('/user/token');
      const { token, user } = data
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token');
    }
  }

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

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      registerUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
};