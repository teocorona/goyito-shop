import { createContext } from 'react';
import { UserType } from '../../types/user';

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserType;
}

export const AuthContext = createContext({} as ContextProps) 