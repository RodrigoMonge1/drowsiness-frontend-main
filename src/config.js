let API_URL = "https://drowsiness-backend-main-production.up.railway.app";

// Detectar si estamos en entorno de desarrollo Vite (usando import.meta.env)
let viteApiUrl = undefined;
try {
  // Esto solo funcionará en tiempo de ejecución del navegador con Vite
  viteApiUrl = eval("import.meta.env.VITE_API_URL");
} catch (e) {
  // Estamos en entorno de Jest o Node, ignorar
}

if (viteApiUrl) {
  API_URL = viteApiUrl;
} else if (typeof process !== "undefined" && process.env.VITE_API_URL) {
  API_URL = process.env.VITE_API_URL;
}

export { API_URL };
