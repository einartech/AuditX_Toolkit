import api from "./axios";

export const AuthService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    if (res.data.token) localStorage.setItem("jwt", res.data.token);
    return res.data;
  },
  logout: () => {
    localStorage.removeItem("jwt");
  },
};
