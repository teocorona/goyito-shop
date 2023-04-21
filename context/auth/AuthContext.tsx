import { createContext } from 'react';
import { UserType } from '../../types/user';

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserType;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>,
  logoutUser: () => Promise<void>
}

export const AuthContext = createContext({} as ContextProps) 