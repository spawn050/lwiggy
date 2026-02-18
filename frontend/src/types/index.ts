import { ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  password?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface ApiError {
  message: string;
  code?: number;
}
