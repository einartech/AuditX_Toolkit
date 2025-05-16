import api from "./axios";

export const NmapService = {
  runScan: async (scanData) => {
    const res = await api.post("/nmap/scan", scanData);
    return res.data;
  },
};
