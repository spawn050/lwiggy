const BASE = "http://localhost:8080";

export function register(data){
  return fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function login(data){
  return fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    credentials: "include",
    body: JSON.stringify(data)
  });
}

export function logout() {
  return fetch(`${BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export function me(){
  return fetch(`${BASE}/api/auth/me`, {
    credentials: "include"
  });
}

