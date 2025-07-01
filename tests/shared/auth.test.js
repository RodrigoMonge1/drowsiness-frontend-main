// tests/shared/auth.test.js
import {
  guardarToken,
  obtenerToken,
  eliminarToken,
  estaAutenticado,
} from "../../src/shared/auth";

beforeEach(() => {
  localStorage.clear();
});

describe("auth.js – funciones de token", () => {
  it("guardarToken guarda el token en localStorage", () => {
    guardarToken("abc123");
    expect(localStorage.getItem("jwt_token")).toBe("abc123");
  });

  it("obtenerToken devuelve el token correcto", () => {
    localStorage.setItem("jwt_token", "xyz789");
    expect(obtenerToken()).toBe("xyz789");
  });

  it("eliminarToken borra el token del localStorage", () => {
    localStorage.setItem("jwt_token", "toDelete");
    eliminarToken();
    expect(localStorage.getItem("jwt_token")).toBeNull();
  });

  it("estaAutenticado devuelve true si hay token", () => {
    localStorage.setItem("jwt_token", "exists");
    expect(estaAutenticado()).toBe(true);
  });

  it("estaAutenticado devuelve false si NO hay token", () => {
    expect(estaAutenticado()).toBe(false);
  });
});
