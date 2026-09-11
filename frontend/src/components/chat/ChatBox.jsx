import Message from "./Message";

export default function ChatBox({ messages }) {
  return (
    <div className="bg-slate-900 rounded-2xl h-[550px] overflow-y-auto p-6 space-y-4 border border-slate-700">

      {messages.length === 0 && (
        <p className="text-slate-500 text-center mt-20">
          Upload a document and ask questions.
        </p>
      )}

      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg.message}
          sender={msg.sender}
        />
      ))}

    </div>
  );
}