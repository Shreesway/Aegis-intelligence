import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

/* ===========================
   Dashboard
=========================== */

export const getDashboard = (company) =>
  api.get(
    `/dashboard?company=${encodeURIComponent(company)}`
  );

/* ===========================
   Company Information
=========================== */

export const getCompany = (company) =>
  api.get(
    `/company?company=${encodeURIComponent(company)}`
  );

/* ===========================
   AI Analysis
=========================== */

export const analyzeCompany = (company) =>
  api.get(
    `/analyze?company=${encodeURIComponent(company)}`
  );

/* ===========================
   Multi-Agent Analysis
=========================== */

export const fullAnalysis = (company) =>
  api.get(
    `/full-analysis?company=${encodeURIComponent(company)}`
  );

/* ===========================
   Company Comparison
=========================== */

export const compareCompanies = (company1, company2) =>
  api.get(
    `/compare?company1=${encodeURIComponent(company1)}&company2=${encodeURIComponent(company2)}`
  );

/* ===========================
   Universal Upload
=========================== */

export const uploadDocument = (
  formData,
  onUploadProgress
) =>
  api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 180000,
    onUploadProgress,
  });

/* ===========================
   RAG Chat
=========================== */

export const askDocument = (query) =>
  api.get(
    `/search?query=${encodeURIComponent(query)}`
  );

/* ===========================
   Download Report
=========================== */

export const downloadReport = (company) =>
  api.get(
    `/download-report?company=${encodeURIComponent(company)}`,
    {
      responseType: "blob",
      timeout: 180000,
    }
  );

/* ===========================
   Stock Chart
=========================== */

export const getStockChart = (company) =>
  `${api.defaults.baseURL}/stock-chart?company=${encodeURIComponent(company)}`;