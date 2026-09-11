import { NavLink } from "react-router-dom";
import { MessageSquare } from "lucide-react";

import {
  LayoutDashboard,
  Upload,
  BarChart3,
  GitCompare,
  FileText,
  History,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },

  { name: "Upload", icon: Upload, path: "/upload" },

  { name: "AI Chat", icon: MessageSquare, path: "/chat" },

  { name: "Analysis", icon: BarChart3, path: "/analysis" },

  { name: "Compare", icon: GitCompare, path: "/compare" },

  { name: "Reports", icon: FileText, path: "/reports" },

  { name: "History", icon: History, path: "/history" },

  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-500">
          AEGIS
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Financial Intelligence
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
