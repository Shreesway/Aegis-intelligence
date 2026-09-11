import { useState } from "react";

import SearchBox from "../components/common/SearchBox";
import Loader from "../components/common/Loader";

import { fullAnalysis } from "../services/api";

export default function Analysis() {

  const [company, setCompany] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch(value) {

    const name =
      value?.trim();

    if (!name) {
      return;
    }

    setCompany(name);
    setResult(null);
    setError("");
    setLoading(true);

    try {

      const res =
        await fullAnalysis(name);

      setResult(res.data);

    } catch (err) {

      console.error(
        "Full analysis error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        "Unable to generate full analysis."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          AI Financial Analysis
        </h1>

        <p className="text-slate-400 mt-2">
          Multi-agent analysis powered by Aegis Intelligence.
        </p>
      </div>

      <SearchBox
        onSearch={handleSearch}
        placeholder="Search company..."
      />

      {loading && (
        <Loader
          text="Running multi-agent analysis..."
        />
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4">
          {error}
        </div>
      )}

      {!loading && result && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

          <h2 className="text-2xl font-bold mb-6">
            {company} — Full Analysis
          </h2>

          <div className="text-slate-300 leading-8 whitespace-pre-wrap">

            {typeof result === "string"
              ? result
              : result.final_report ||
                result.report ||
                JSON.stringify(
                  result,
                  null,
                  2
                )}

          </div>

        </div>
      )}

    </div>

  );
}