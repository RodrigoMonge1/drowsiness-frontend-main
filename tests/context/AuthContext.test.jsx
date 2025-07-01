// tests/context/AuthContext.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../src/context/AuthContext";
import userEvent from "@testing-library/user-event";

// Mock de localStorage
beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

// Componente auxiliar para acceder al contexto
function TestComponent() {
  const { userId, token, isAuth, login, logout } = useAuth();

  return (
    <div>
      <p>userId: {userId}</p>
      <p>token: {token}</p>
      <p>isAuth: {isAuth ? "true" : "false"}</p>
      <button onClick={() => login("usuario123", "token456")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  it("inicia sin sesión activa", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("userId:")).toBeInTheDocument();
    expect(screen.getByText("token:")).toBeInTheDocument();
    expect(screen.getByText("isAuth: false")).toBeInTheDocument();
  });

  it("realiza login correctamente y actualiza el estado", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText("Login");
    await userEvent.click(loginBtn);

    expect(screen.getByText("userId: usuario123")).toBeInTheDocument();
    expect(screen.getByText("token: token456")).toBeInTheDocument();
    expect(screen.getByText("isAuth: true")).toBeInTheDocument();
    expect(localStorage.getItem("userId")).toBe("usuario123");
    expect(localStorage.getItem("jwt_token")).toBe("token456");
  });

  it("realiza logout correctamente", async () => {
    localStorage.setItem("userId", "prueba");
    localStorage.setItem("jwt_token", "abc123");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutBtn = screen.getByText("Logout");
    await userEvent.click(logoutBtn);

    expect(screen.getByText("userId:")).toBeInTheDocument();
    expect(screen.getByText("token:")).toBeInTheDocument();
    expect(screen.getByText("isAuth: false")).toBeInTheDocument();
    expect(localStorage.getItem("userId")).toBeNull();
    expect(localStorage.getItem("jwt_token")).toBeNull();
  });
});
