beforeAll(() => {
  process.env.VITE_API_URL = "http://localhost:3001";
});

import { renderHook, act } from "@testing-library/react";
import { useSomnolencia } from "../../src/hooks/useSomnolencia";

describe("useSomnolencia (core)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("calcula EAR correctamente", () => {
    const { result } = renderHook(() => useSomnolencia());

    const puntos = [
      { x: 1, y: 1 }, // 0
      { x: 1, y: 2 }, // 1
      { x: 1, y: 3 }, // 2
      { x: 4, y: 1 }, // 3
      { x: 4, y: 3 }, // 4
      { x: 4, y: 2 }, // 5
    ];

    const EAR = result.current.calcularEAR(puntos);
    expect(EAR).toBeGreaterThan(0);
  });

  it("aumenta y disminuye probabilidad correctamente", () => {
    const { result } = renderHook(() => useSomnolencia());

    act(() => {
      result.current.aumentarProbabilidad(20);
      result.current.disminuirProbabilidad(5);
    });

    expect(result.current.probabilidad).toBe(15);
  });

  it("agrega evento local correctamente", () => {
    localStorage.setItem("sesionId", "fake-session-id");
    localStorage.setItem("jwt_token", "fake-token");

    const { result } = renderHook(() => useSomnolencia());

    act(() => {
      result.current.aumentarProbabilidad(10); // Esto no afecta el valor de prob del evento
      result.current.agregarEvento("parpadeo", 5); // Solo se registra 5
    });

    const eventos = result.current.eventos;
    expect(eventos.length).toBe(1);
    expect(eventos[0].tipo).toBe("parpadeo");
    expect(eventos[0].prob).toBe(5); // <-- cambio aquí
  });

  it("reinicia correctamente todos los estados", () => {
    const { result } = renderHook(() => useSomnolencia());

    act(() => {
      result.current.aumentarProbabilidad(50);
      result.current.reiniciarSesion();
    });

    expect(result.current.probabilidad).toBe(0);
    expect(result.current.eventos.length).toBe(0);
    expect(result.current.bostezos).toBe(0);
    expect(result.current.parpadeos).toBe(0);
    expect(result.current.sesionId).toBe(null);
  });
});
