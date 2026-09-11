import StatCard from "./StatCard";

export default function KPIGrid({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Current Price"
        value={
          data.current_price
            ? `$${Number(data.current_price).toFixed(2)}`
            : "N/A"
        }
        color="text-green-400"
      />

      <StatCard
        title="Market Cap"
        value={data.market_cap}
        color="text-blue-400"
      />

      <StatCard
        title="PE Ratio"
        value={data.pe_ratio}
        color="text-yellow-400"
      />

      <StatCard
        title="Dividend Yield"
        value={
          data.dividend_yield
            ? `${(data.dividend_yield * 100).toFixed(2)}%`
            : "N/A"
        }
        color="text-purple-400"
      />

      <StatCard
        title="52 Week High"
        value={
          data.fifty_two_week_high
            ? `$${data.fifty_two_week_high}`
            : "N/A"
        }
      />

      <StatCard
        title="52 Week Low"
        value={
          data.fifty_two_week_low
            ? `$${data.fifty_two_week_low}`
            : "N/A"
        }
      />

      <StatCard
        title="Sector"
        value={data.sector}
      />

      <StatCard
        title="Industry"
        value={data.industry}
      />

    </div>
  );
}