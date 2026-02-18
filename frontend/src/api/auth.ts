import { LoginForm, RegisterForm } from '../types';

const BASE = "http://localhost:8080";

export function register(data: RegisterForm): Promise<Response> {
  return fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function login(data: LoginForm): Promise<Response> {
  return fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function logout(): Promise<Response> {
  return fetch(`${BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export function me(): Promise<Response> {
  return fetch(`${BASE}/api/auth/me`, {
    credentials: "include"
  });
}
