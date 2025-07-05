// Definir variable de entorno para Jest
process.env.VITE_API_URL = "http://localhost:3001";

// Soporte para Testing Library
import "@testing-library/jest-dom";

// Soporte para TextEncoder/TextDecoder en Jest
import { TextEncoder, TextDecoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}
