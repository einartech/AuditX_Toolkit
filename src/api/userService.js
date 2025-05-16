import api from "./axios";

export const UserService = {
  register: async (userData) => {
    const res = await api.post("/users", userData);
    return res.data;
  },
  getAll: async () => {
    const res = await api.get("/users");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
  update: async (id, userData) => {
    const res = await api.put(`/users/${id}`, userData);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};
