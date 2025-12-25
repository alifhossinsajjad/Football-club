"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Input } from "../input";

const mockMessages = [
  {
    id: 1,
    text: "Hello, I'm very interested in your upcoming trial.",
    time: "9:30 AM",
    sender: "other",
  },
  {
    id: 2,
    text: "Hi John! Thank you for your interest. I'd be happy to provide more details.",
    time: "9:45 AM",
    sender: "me",
  },
  {
    id: 3,
    text: "That would be great! What are the requirements?",
    time: "10:00 AM",
    sender: "other",
  },
  {
    id: 4,
    text: "The trial is open to players aged 16-21. You'll need to bring your sports gear and be prepared for physical tests.",
    time: "10:15 AM",
    sender: "me",
  },
];

export default function ChatModal({ isOpen, onClose, player }) {
  const theme = useSelector((state) => state.theme);
  const [message, setMessage] = useState("");

  if (!isOpen || !player) return null;

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50   flex items-center justify-center p-4">
        <div
          className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden min-h-[70vh]"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            border: `1px solid ${theme.colors.primaryCyan}33`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-5 border-b"
            style={{
              borderColor: `${theme.colors.primaryCyan}33`,
              backgroundColor: `${theme.colors.backgroundCard}ee`,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={player.avatar || "/default-avatar.png"}
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {player.name}
                </h3>
                <p className="text-sm text-green-400">Active now</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-sm px-5 py-5 rounded-2xl `}
                  style={{
                    backgroundColor:
                      msg.sender === "me"
                        ? "#9C27B0"
                        : theme.colors.backgroundDark,
                  }}
                >
                  <p className="text-white text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-300 mt-1 text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            className="p-5 border-t"
            style={{ borderColor: `${theme.colors.primaryCyan}33` }}
          >
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-5 py-3 rounded-full text-white placeholder-gray-500 outline-none"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                }}
              />
              <Button
                variant="common"
                onClick={handleSend}
                disabled={!message.trim()}
                className="px-6 py-3 rounded-full  font-medium disabled:opacity-50 text-white"
                style={{ backgroundColor: theme.colors.button }}
              >
                <Send className="w-5 h-5" /> Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
