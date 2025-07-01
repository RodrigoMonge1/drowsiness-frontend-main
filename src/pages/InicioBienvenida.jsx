import React from "react";
import { Link } from "react-router-dom";
import { FaBrain, FaEye, FaBell } from "react-icons/fa";
import logoSomno from "../assets/logo_somno1.png"; // Asegúrate de que la ruta sea correcta

export default function InicioBienvenida() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] text-white text-center px-6">
      
      


      {/* TÍTULO PRINCIPAL */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-sm">
        Bienvenido a 
      </h1>

      {/* LOGO */}
      <img src={logoSomno} alt="Logo SomnoLive" className="w-48 h-48 mb-6" />

      {/* SUBTÍTULO MODIFICADO */}
      <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-xl">
        Monitorea en tiempo real tu nivel de somnolencia mientras trabajas, estudias o realizas cualquier actividad.
        Solo mantén abierta la plataforma y observa las señales analizadas por IA en vivo.
      </p>

      {/* CARACTERÍSTICAS */}
      <div className="text-sm md:text-base text-blue-200 max-w-xl mb-6 space-y-2">
        <p className="flex items-center justify-center gap-2">
          <FaBrain className="text-white" /> Análisis inteligente de señales faciales
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaEye className="text-white" /> Detección de parpadeos, bostezos y expresión ocular
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaBell className="text-white" /> Alertas visuales y estadísticas en vivo
        </p>
      </div>

      {/* AVISO PARA USUARIO */}
      <p className="text-blue-100 italic mb-6">
        🎯 Para comenzar a usar SomnoLive, primero inicia sesión o regístrate.
      </p>

      {/* BOTONES */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-100 transition">
            Iniciar sesión
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-100 transition">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}
