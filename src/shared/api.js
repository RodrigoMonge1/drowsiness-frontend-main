// shared/api.js

import { API_URL } from "../config";



import { guardarToken, obtenerToken, eliminarToken } from './auth';
import { goToLogin } from './navigation';

// 🔧 Construir headers con token si existe
function construirHeaders() {
  const token = obtenerToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ✅ Función para manejar respuestas y errores 401
async function manejarRespuesta(res) {
  if (res.status === 401) {
    eliminarToken();
    goToLogin(); // Redirige al login si la sesión expira
    throw new Error("Sesión expirada");
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Error desconocido");
  }
  return await res.json();
}

// 🔵 Login de usuario
export async function loginUsuario(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await manejarRespuesta(res); 
    if (!data.token || !data.userId) {
      throw new Error("Respuesta incompleta del servidor");
    }

    guardarToken(data.token); 
    return {
      token: data.token,
      userId: data.userId,
    };
  } catch (err) {
    console.error("loginUsuario error:", err.message);
    throw err;
  }
}

// 🔵 Registro de usuario
export async function registrarUsuario(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("registrarUsuario error:", err.message);
    throw err;
  }
}

// 🔵 Crear nueva sesión
export async function crearSesion() {
  try {
    const res = await fetch(`${API_URL}/sesiones`, {
      method: "POST",
      headers: construirHeaders(),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("crearSesion error:", err.message);
    return null;
  }
}

// 🔵 Registrar evento
export async function registrarEvento(evento) {
  try {
    const res = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: construirHeaders(),
      body: JSON.stringify(evento),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("registrarEvento error:", err.message);
    return null;
  }
}

// 🔵 Finalizar sesión
export async function finalizarSesion(id, data) {
  try {
    const res = await fetch(`${API_URL}/sesiones/${id}/finalizar`, {
      method: "PATCH",
      headers: construirHeaders(),
      body: JSON.stringify(data),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("finalizarSesion error:", err.message);
    return null;
  }
}

// 🔵 Obtener todas las sesiones
export async function getSesiones() {
  try {
    const res = await fetch(`${API_URL}/sesiones`, {
      headers: construirHeaders(),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("getSesiones error:", err.message);
    return [];
  }
}

// 🔵 Obtener sesión por ID
export async function getSesionPorId(id) {
  try {
    const res = await fetch(`${API_URL}/sesiones/${id}`, {
      headers: construirHeaders(),
    });
    return await manejarRespuesta(res);
  } catch (err) {
    console.error("getSesionPorId error:", err.message);
    return null;
  }
}
