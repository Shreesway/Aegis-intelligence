import { Loader2 } from "lucide-react";

export default function Loader({
  text = "Loading..."
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2
        size={42}
        className="animate-spin text-blue-500"
      />

      <p className="text-slate-400 text-lg">
        {text}
      </p>
    </div>
  );
}