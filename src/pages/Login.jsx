import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUsuario } from "../shared/api";
// Si quieres usar íconos más pro, descomenta esto:
// import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login, userId } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Estado para mostrar/ocultar contraseña

  useEffect(() => {
    console.log("✅ userId cambió a:", userId);
    if (userId) {
      navigate("/menu");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUsuario(form.email, form.password);
      console.log("✅ Login exitoso:", res);

      if (res && res.userId && res.token) {
        login(res.userId, res.token);
      } else {
        throw new Error("Respuesta del servidor incompleta");
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err.message);
      setError("Credenciales incorrectas o usuario no autorizado");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] flex flex-col justify-center items-center px-6 text-white relative">
      
      {/* Botón Volver al Inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:underline text-sm font-medium transition"
      >
        ← Volver al inicio
      </Link>

      <h1 className="text-4xl font-bold mb-6">Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo contraseña con botón mostrar/ocultar */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-3 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? "🙈" : "👁️"}
            {/* Si usas react-icons:
            {showPassword ? <FaEyeSlash /> : <FaEye />} */}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Iniciar sesión
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-700 font-medium underline">
            Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
