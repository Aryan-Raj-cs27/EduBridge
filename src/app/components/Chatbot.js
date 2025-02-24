"use client";
import { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        <IoChatbubbleEllipsesSharp size={30} />
      </button>

      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-80 h-96 fixed bottom-16 right-5">
          <h2 className="text-lg font-bold">EduBridge AI Chat</h2>
          <div className="h-72 overflow-y-auto p-2 border border-gray-300 mt-2">
            {/* Messages will appear here */}
            <p className="text-gray-500">Chatbot is coming soon...</p>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded mt-2"
          />
        </div>
      )}
    </div>
  );
}
