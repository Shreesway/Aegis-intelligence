import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [company, setCompany] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [summary, setSummary] = useState("");
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");

  return (
    <AppContext.Provider
      value={{
        company, setCompany,
        dashboard, setDashboard,
        summary, setSummary,
        dashboardLoading, setDashboardLoading,
        aiLoading, setAiLoading,
        error, setError,
        aiError, setAiError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);