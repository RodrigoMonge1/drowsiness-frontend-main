// src/config.js

// Para Jest: leer de process.env
// Para Vite: usar define en vite.config.js
export const API_URL = process.env.VITE_API_URL || "http://localhost:3001";
