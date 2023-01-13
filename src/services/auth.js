import Axios from "axios";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = "token";

export async function signIn(username, password) {
  const { data: jwt } = await Axios.post(`${config.Api}/auth/signin`, {
    username: username,
    password: password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export async function Register(user) {
  return Axios.post(`${config.Api}/auth/signup`, user);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function forgotPassword(username) {
  return Axios.post(`${config.Api}/auth/forgotpassword`, {
    username: username,
  });
}

export function resetPasssword(token, password) {
  return Axios.post(`${config.Api}/auth/resetpassword`, {
    token: token,
    password: password,
  });
}
