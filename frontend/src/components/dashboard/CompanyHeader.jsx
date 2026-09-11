import {
  Building2,
  Globe,
  Briefcase,
  Landmark,
} from "lucide-react";

export default function CompanyHeader({ company }) {
  if (!company) return null;

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
      <div className="flex justify-between items-start flex-wrap gap-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            {company.company}
          </h1>

          <p className="text-slate-400 mt-2">
            Financial Overview
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-blue-500" />
            <span>{company.sector || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-green-500" />
            <span>{company.industry || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Landmark size={18} className="text-yellow-500" />
            <span>
              52W High: {company.fifty_two_week_high ?? "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Globe size={18} className="text-cyan-500" />
            <span>
              52W Low: {company.fifty_two_week_low ?? "N/A"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}