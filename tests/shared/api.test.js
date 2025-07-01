// tests/shared/api.test.js
beforeAll(() => {
  // Simula la variable de entorno usada en src/shared/api.js
  process.env.VITE_API_URL = "http://localhost:3001";
});

import {
  loginUsuario,
  registrarUsuario,
  getSesiones,
  finalizarSesion,
} from "../../src/shared/api";

import * as auth from "../../src/shared/auth";

// Mock global fetch
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("api.js – funciones principales", () => {
  it("loginUsuario retorna token y userId válidos", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "abc123", userId: "user789" }),
    });

    const result = await loginUsuario("correo@test.com", "123456");
    expect(result).toEqual({ token: "abc123", userId: "user789" });
  });

  it("registrarUsuario responde exitosamente", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await registrarUsuario("nuevo@correo.com", "clave");
    expect(result).toEqual({ success: true });
  });

  it("getSesiones devuelve lista vacía si hay error", async () => {
    fetch.mockRejectedValueOnce(new Error("Fallo de red"));
    const result = await getSesiones();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it("finalizarSesion llama PATCH correctamente", async () => {
    jest.spyOn(auth, "obtenerToken").mockReturnValue("tokenFake");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await finalizarSesion("id123", { duracion: 30 });
    expect(result).toEqual({ success: true });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/sesiones/id123/finalizar"),
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({ Authorization: "Bearer tokenFake" }),
      })
    );
  });
});
