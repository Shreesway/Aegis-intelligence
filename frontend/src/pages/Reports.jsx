import { useState } from "react";

import SearchBox from "../components/common/SearchBox";

import { downloadReport } from "../services/api";

export default function Reports() {

  const [company, setCompany] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleGenerate(value) {

    const name =
      value?.trim();

    if (!name) {
      return;
    }

    setCompany(name);
    setError("");
    setLoading(true);

    try {

      const response =
        await downloadReport(name);

      const blob =
        new Blob(
          [response.data],
          {
            type:
              "application/pdf",
          }
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${name}_Aegis_Report.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (err) {

      console.error(
        "Report generation error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        "Unable to generate report."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Research Reports
        </h1>

        <p className="text-slate-400 mt-2">
          Generate and download an Aegis financial research report.
        </p>

      </div>

      <SearchBox
        onSearch={handleGenerate}
        placeholder="Enter company name..."
      />

      {loading && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-slate-300">
          Generating report. This may take a while because the AI analysis runs first...
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4">
          {error}
        </div>
      )}

      {!loading && !error && company && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

          <h2 className="text-xl font-bold">
            Report ready
          </h2>

          <p className="text-slate-400 mt-2">
            The report for {company} has been generated/downloaded.
          </p>

        </div>
      )}

    </div>

  );
}