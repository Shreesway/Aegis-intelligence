import { useState } from "react";

import ChatBox from "../components/chat/ChatBox";
import ChatInput from "../components/chat/ChatInput";

import { askDocument } from "../services/api";

const STORAGE_KEY =
  "aegis_document_chat";

export default function Chat() {

  const [messages, setMessages] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] =
    useState(false);

  const saveMessages = (updated) => {
    setMessages(updated);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
    } catch {
      console.warn(
        "Unable to save chat history."
      );
    }
  };

  async function handleSend(question) {

    const cleanQuestion =
      question?.trim();

    if (!cleanQuestion || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: cleanQuestion,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    saveMessages(updatedMessages);

    setLoading(true);

    try {

      const res =
        await askDocument(cleanQuestion);

      const answer =
        res?.data?.answer ||
        res?.data?.response ||
        res?.data?.result;

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        message:
          answer ||
          "The AI did not return an answer.",
      };

      saveMessages([
        ...updatedMessages,
        aiMessage,
      ]);

    } catch (error) {

      console.error(
        "Document chat error:",
        error
      );

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        message:
          "Unable to answer the question. Please make sure a document has been uploaded and try again.",
      };

      saveMessages([
        ...updatedMessages,
        errorMessage,
      ]);

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          AI Document Chat
        </h1>

        <p className="text-slate-400 mt-2">
          Ask questions about your uploaded documents.
        </p>
      </div>

      <ChatBox
        messages={messages}
      />

      {loading && (
        <div className="text-slate-400 text-sm">
          AI is thinking...
        </div>
      )}

      <ChatInput
        onSend={handleSend}
        disabled={loading}
      />

    </div>

  );
}