import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex gap-3 mt-5">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        className="flex-1 bg-slate-800 rounded-xl px-5 py-3 outline-none"
        placeholder="Ask about uploaded documents..."
      />

      <button
        onClick={send}
        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5"
      >
        <Send />
      </button>

    </div>
  );
}