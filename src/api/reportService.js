import api from "./axios";

export const ReportService = {
  getReportsByUser: async (userId) => {
    const res = await api.get(`/nmap/reports/user/${userId}`);
    return res.data;
  },
  deleteReport: async (reportId) => {
    await api.delete(`/nmap/reports/${reportId}`);
  },
};
