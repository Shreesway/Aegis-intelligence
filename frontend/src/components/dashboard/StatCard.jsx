export default function StatCard({
  title,
  value,
  color = "text-white",
}) {
  const formatValue = (val) => {
    if (val === null || val === undefined) return "N/A";

    if (typeof val === "number") {
      if (val >= 1_000_000_000_000)
        return (val / 1_000_000_000_000).toFixed(2) + " T";

      if (val >= 1_000_000_000)
        return (val / 1_000_000_000).toFixed(2) + " B";

      if (val >= 1_000_000)
        return (val / 1_000_000).toFixed(2) + " M";

      return val.toLocaleString();
    }

    return val;
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]">
      <p className="text-slate-400 text-sm">{title}</p>

      <h2 className={`text-3xl font-bold mt-3 ${color}`}>
        {formatValue(value)}
      </h2>
    </div>
  );
}