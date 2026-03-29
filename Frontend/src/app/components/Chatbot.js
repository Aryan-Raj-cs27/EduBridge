"use client";
import { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your EduBridge assistant. Ask about courses, AI, web, or python.",
    },
  ]);
  const messagesRef = useRef(null);

  const getBotReply = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! I am your EduBridge assistant.";
    }

    if (text.includes("course") || text.includes("courses")) {
      return "We currently offer AI for Beginners, Web Development, and Python Programming.";
    }

    if (text.includes("ai")) {
      return "AI for Beginners is a good starting point for machine learning basics.";
    }

    if (
      text.includes("web") ||
      text.includes("html") ||
      text.includes("css") ||
      text.includes("javascript")
    ) {
      return "Our Web Development course covers HTML, CSS, JavaScript, and React fundamentals.";
    }

    if (text.includes("python")) {
      return "Python Programming covers basics to advanced coding concepts.";
    }

    return "Please ask about courses, AI, web, or python.";
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: `You: ${trimmed}` };
    const botMessage = { sender: "bot", text: `Bot: ${getBotReply(trimmed)}` };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-slate-900 p-3 text-white shadow-lg transition hover:bg-slate-800"
        aria-label="Toggle chatbot"
      >
        <IoChatbubbleEllipsesSharp size={30} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-5 flex h-[26rem] w-[20rem] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:w-[22rem]">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              <span className="text-blue-600">Edu</span>Bridge AI Chat
            </h2>
          </div>
          <div
            ref={messagesRef}
            className="mx-3 my-3 flex-1 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-2"
          >
            {messages.map((message, index) => (
              <p
                key={`${message.sender}-${index}`}
                className={`mb-2 text-sm ${
                  message.sender === "user" ? "text-blue-700" : "text-slate-700"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>

          <form onSubmit={handleSend} className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="min-w-0 flex-1 rounded border border-slate-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-800"
            >
              Send
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
