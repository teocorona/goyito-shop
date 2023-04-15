
export interface UserType {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: roleType;
  createdAt: string;
  updatedAt: string;
}

export type roleType = 'admin' | 'client';