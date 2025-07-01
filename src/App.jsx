// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setNavigator } from "./shared/navigation";

// Páginas
import InicioBienvenida from "./pages/InicioBienvenida";
import MenuPrincipal from "./pages/MenuPrincipal";
import Detection from "./pages/Detection";
import Registros from "./pages/Registros";
import SesionDetalle from "./pages/SesionDetalle";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Rutas protegidas
import ProtectedRoute from "./routes/ProtectedRoute";

export default function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Routes>
      {/* Página pública de bienvenida */}
      <Route path="/" element={<InicioBienvenida />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Página protegida: menú principal tras login */}
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <MenuPrincipal />
          </ProtectedRoute>
        }
      />

      {/* Resto de rutas protegidas */}
      <Route
        path="/detectar"
        element={
          <ProtectedRoute>
            <Detection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registros"
        element={
          <ProtectedRoute>
            <Registros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registros/:id"
        element={
          <ProtectedRoute>
            <SesionDetalle />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
