import { useState } from "react";

import CompareForm from "../components/compare/CompareForm";
import CompareTable from "../components/compare/CompareTable";
import CompareResult from "../components/compare/CompareResult";

import { compareCompanies } from "../services/api";

export default function Compare() {

  const [comparison, setComparison] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleCompare(
    company1,
    company2
  ) {

    const first =
      company1?.trim();

    const second =
      company2?.trim();

    if (!first || !second) {
      setError(
        "Please enter both companies."
      );
      return;
    }

    if (
      first.toLowerCase() ===
      second.toLowerCase()
    ) {
      setError(
        "Please choose two different companies."
      );
      return;
    }

    setLoading(true);
    setError("");
    setComparison("");

    try {

      const res =
        await compareCompanies(
          first,
          second
        );

      const result =
        res?.data?.comparison;

      if (!result) {
        setError(
          "No comparison result was returned."
        );
        return;
      }

      setComparison(result);

    } catch (err) {

      console.error(
        "Comparison error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        "Unable to compare companies."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Company Comparison
        </h1>

        <p className="text-slate-400 mt-2">
          Compare companies using financial and AI-powered analysis.
        </p>
      </div>

      <CompareForm
        onCompare={handleCompare}
      />

      {loading && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-slate-300">
          Comparing companies...
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4">
          {error}
        </div>
      )}

      {!loading && comparison && (
        <>
          <CompareTable
            data={comparison}
          />

          <CompareResult
            result={comparison}
          />
        </>
      )}

    </div>

  );
}