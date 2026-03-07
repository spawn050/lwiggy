import { LoginForm, RegisterForm } from '../types';
import { API_URLS } from './ApiConstants';

export function register(data: RegisterForm): Promise<Response> {
  return fetch(API_URLS.REGISTER, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function login(data: LoginForm): Promise<Response> {
  return fetch(API_URLS.LOGIN, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function logout(): Promise<Response> {
  return fetch(API_URLS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
}

export function me(): Promise<Response> {
  return fetch(API_URLS.ME, {
    credentials: "include"
  });
}
