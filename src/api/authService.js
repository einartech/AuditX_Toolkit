import api from "./axios";

export const AuthService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    if (res.data.token) {
      localStorage.setItem("jwt", res.data.token);
    }
    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  },
  logout: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
  },
};
