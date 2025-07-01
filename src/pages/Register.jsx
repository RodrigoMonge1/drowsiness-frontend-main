import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../shared/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", repassword: "" });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (form.password !== form.repassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrarUsuario(form.email, form.password);
      setExito("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Error al registrar:", err.message);
      setError("Error al registrar usuario");
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


      <h1 className="text-4xl font-bold mb-6">Crear cuenta</h1>

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

        {/* Campo Contraseña con ojito */}
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
          </button>
        </div>

        {/* Campo Repetir contraseña con ojito */}
        <div className="relative">
          <label htmlFor="repassword" className="block text-sm font-medium">
            Repetir contraseña
          </label>
          <input
            type={showRePassword ? "text" : "password"}
            name="repassword"
            value={form.repassword}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute top-8 right-3 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showRePassword ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {exito && <p className="text-green-600 text-sm">{exito}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Registrarse
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-700 font-medium underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
