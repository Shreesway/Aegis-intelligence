import React from "react";
import { useApp } from "../context/AppContext";

import SearchBox from "../components/common/SearchBox";
import Loader from "../components/common/Loader";

import CompanyHeader from "../components/dashboard/CompanyHeader";
import KPIGrid from "../components/dashboard/KPIGrid";
import SummaryCard from "../components/dashboard/SummaryCard";
import StockChart from "../components/dashboard/StockChart";

import {
  getDashboard,
  analyzeCompany,
} from "../services/api";

export default function Dashboard() {
  // Pulling state from Global Context instead of local useState
  const {
    company, setCompany,
    dashboard, setDashboard,
    summary, setSummary,
    dashboardLoading, setDashboardLoading,
    aiLoading, setAiLoading,
    error, setError,
    aiError, setAiError
  } = useApp();

  const handleSearch = async (value) => {
    const searchedCompany = value?.trim();

    if (!searchedCompany) {
      setError("Please enter a company name.");
      return;
    }

    setCompany(searchedCompany);
    setDashboard(null);
    setSummary("");
    setError("");
    setAiError("");
    setDashboardLoading(true);

    try {
      /*
       * =========================
       * Financial dashboard
       * =========================
       */
      const dashboardRes = await getDashboard(searchedCompany);
      setDashboard(dashboardRes.data);
    } catch (err) {
      console.error("Dashboard request failed:", err);
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to fetch company data.";

      setError(message);
      setDashboard(null);
      setDashboardLoading(false);
      return;
    }

    setDashboardLoading(false);

    /*
     * =========================
     * AI analysis
     * =========================
     */
    setAiLoading(true);

    try {
      const analysisRes = await analyzeCompany(searchedCompany);
      const analysis = analysisRes?.data?.analysis;

      if (analysis) {
        setSummary(analysis);
      } else {
        setAiError("AI analysis returned no response.");
      }
    } catch (err) {
      console.error("AI analysis failed:", err);
      setAiError("AI analysis is currently unavailable.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* =========================
          Header
      ========================= */}
      <div>
        <h1 className="text-4xl font-bold">
          AEGIS Intelligence
        </h1>
        <p className="text-slate-400 mt-2">
          AI-Powered Financial Research Platform
        </p>
      </div>

      {/* =========================
          Search
      ========================= */}
      <SearchBox
        onSearch={handleSearch}
        placeholder="Search company (Apple, Tesla, Microsoft...)"
      />

      {/* =========================
          Dashboard Loading
      ========================= */}
      {dashboardLoading && (
        <Loader
          text="Fetching financial data..."
        />
      )}

      {/* =========================
          Dashboard Error
      ========================= */}
      {error && !dashboardLoading && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4">
          {error}
        </div>
      )}

      {/* =========================
          Financial Dashboard
      ========================= */}
      {!dashboardLoading && dashboard && (
        <>
          <CompanyHeader company={dashboard} />
          <KPIGrid data={dashboard} />

          <div className="grid lg:grid-cols-2 gap-6">
            {/* =========================
                AI Summary
            ========================= */}
            <SummaryCard
              summary={summary}
              loading={aiLoading}
              error={aiError}
            />

            {/* =========================
                Stock Chart
            ========================= */}
            <StockChart symbol={company} />
          </div>
        </>
      )}
    </div>
  );
}