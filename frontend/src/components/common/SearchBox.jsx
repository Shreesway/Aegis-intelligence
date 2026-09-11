import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBox({
  onSearch,
  placeholder = "Search company (AAPL, MSFT, NVDA...)",
}) {
  const [symbol, setSymbol] = useState("");

  const handleSearch = () => {
    if (!symbol.trim()) return;
    onSearch(symbol.trim().toUpperCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-2 border border-slate-700">
      <Search className="text-slate-400 ml-2" size={20} />

      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-semibold"
      >
        Search
      </button>
    </div>
  );
}