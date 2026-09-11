import { getStockChart } from "../../services/api";
export default function StockChart({ symbol }) {
  if (!symbol) {
    return (
      <div className="bg-slate-800 rounded-2xl border border-slate-700 h-96 flex items-center justify-center text-slate-400">
        Search for a company to view its stock chart.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
      <h2 className="text-xl font-bold mb-5">
        Stock Price Chart
      </h2>

      <img
    src={getStockChart(symbol)}
    alt="Stock Chart"
    className="rounded-xl w-full"
/>
    </div>
  );
}