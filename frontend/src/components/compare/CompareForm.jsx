import { useState } from "react";

export default function CompareForm({ onCompare }) {
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");

  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex gap-4">

      <input
        value={symbol1}
        onChange={(e) => setSymbol1(e.target.value.toUpperCase())}
        placeholder="AAPL"
        className="flex-1 bg-slate-900 rounded-xl px-4 py-3 outline-none"
      />

      <input
        value={symbol2}
        onChange={(e) => setSymbol2(e.target.value.toUpperCase())}
        placeholder="MSFT"
        className="flex-1 bg-slate-900 rounded-xl px-4 py-3 outline-none"
      />

      <button
        onClick={() => onCompare(symbol1, symbol2)}
        className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700"
      >
        Compare
      </button>

    </div>
  );
}