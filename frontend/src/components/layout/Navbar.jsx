import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <Search className="text-slate-400" />

        <input
          placeholder="Search company..."
          className="bg-slate-800 rounded-lg px-4 py-2 outline-none w-80"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-slate-300 cursor-pointer" />

        <UserCircle
          className="text-blue-500"
          size={34}
        />
      </div>
    </header>
  );
}