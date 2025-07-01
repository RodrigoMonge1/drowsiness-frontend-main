import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("jwt_token"); // Debe coincidir con lo usado en guardarToken

    if (storedUser && storedToken) {
      setUserId(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Función para iniciar sesión: guarda userId y token en el estado y en localStorage
  const login = (id, tokenValue) => {
    setUserId(id);
    setToken(tokenValue);
    localStorage.setItem("userId", id);
    localStorage.setItem("jwt_token", tokenValue);
    console.log("✅ Login exitoso:", id, tokenValue); // <-- AGREGADO
   };

  // Función para cerrar sesión: borra datos del estado y del localStorage
  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("jwt_token");
  };

  return (
    <AuthContext.Provider value={{ userId, token, isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
