import api from "./axios";

export const AuthService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    // Guarda el token si existe
    if (res.data.token) {
      localStorage.setItem("jwt", res.data.token);
    }
    return res.data;
  },
  logout: () => {
    localStorage.removeItem("jwt");
    window.dispatchEvent(new Event("storage")); // Notifica a los listeners
  },
};
