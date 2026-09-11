import { Brain, LoaderCircle } from "lucide-react";

export default function SummaryCard({
  title = "AI Executive Summary",
  summary,
  loading = false,
  error = "",
}) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">

      <div className="flex items-center gap-3 mb-5">

        <Brain
          className="text-blue-500"
          size={24}
        />

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <div className="max-h-80 overflow-y-auto pr-2">

        {loading && (
          <div className="flex items-center gap-3 text-slate-400">

            <LoaderCircle
              className="animate-spin"
              size={20}
            />

            <span>
              AI is analyzing the company...
            </span>

          </div>
        )}

        {!loading && error && (
          <p className="text-amber-400 leading-7">
            {error}
          </p>
        )}

        {!loading && !error && summary && (
          <p className="text-slate-300 leading-8 whitespace-pre-wrap">
            {summary}
          </p>
        )}

        {!loading &&
          !error &&
          !summary && (
            <p className="text-slate-400 leading-7">
              Search for a company to generate an
              AI-powered financial analysis.
            </p>
          )}

      </div>

    </div>
  );
}