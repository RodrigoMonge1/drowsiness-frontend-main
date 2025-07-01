// src/shared/navigation.js
let navigate = null;

export const setNavigator = (navFunc) => {
  navigate = navFunc;
};

export const goToLogin = () => {
  if (navigate) {
    navigate("/login", {
      state: { error: "Tu sesión ha expirado. Por favor inicia sesión de nuevo." },
    });
  } else {
    console.warn("Navegador aún no está disponible.");
  }
};
