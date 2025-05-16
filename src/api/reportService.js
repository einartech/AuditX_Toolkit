import api from "./axios";

export const ReportService = {
  getReportsByUser: async (userId) => {
    const res = await api.get(`/nmap/reports/user/${userId}`);
    return res.data;
  },
};
