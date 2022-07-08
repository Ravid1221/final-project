import http from "./httpService";
import JWTDecode from "jwt-decode";
const apiUrl = "http://localhost:8181/api";

export const register = (user) => http.post(`${apiUrl}/users/register`, user);

export const signIn = async (user) => {
  const {
    data: { token },
  } = await http.post(`${apiUrl}/users/login`, user);
  localStorage.setItem("token", token);
};

export const resetPassword = (user) =>
  http.post(`${apiUrl}/users/resetPassword`, user);

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return (window.location = "/");
};

export const getJWT = () => localStorage.getItem("token");
