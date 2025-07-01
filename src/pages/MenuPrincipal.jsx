import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MenuPrincipal() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();

  const botonClase =
    "bg-white text-blue-800 px-8 py-3 text-lg font-bold rounded-xl shadow-xl hover:bg-blue-100 transition-all duration-200";

  const handleLogout = () => {
    logout();
    navigate("/"); // Vuelve a pantalla pública después de cerrar sesión
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] flex flex-col justify-center items-center px-6 text-white text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-wide">
        Bienvenido al Sistema de Monitoreo de Somnolencia
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed text-slate-100">
        Nuestra aplicación detecta señales fisiológicas como{" "}
        <strong className="text-sky-300 font-semibold">parpadeos</strong>,{" "}
        <strong className="text-sky-300 font-semibold">microsueños</strong> y{" "}
        <strong className="text-sky-300 font-semibold">bostezos</strong> en tiempo real,
        brindando alertas inteligentes para entornos donde la vigilancia es crucial.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {!userId ? (
          <>
            <Link to="/login">
              <button className={botonClase}>Iniciar sesión</button>
            </Link>
            <Link to="/register">
              <button className={botonClase}>Registrarse</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/detectar">
              <button className={botonClase}>Iniciar detección</button>
            </Link>
            <Link to="/registros">
              <button className={botonClase}>Ver registros</button>
            </Link>
            <button onClick={handleLogout} className={botonClase}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
