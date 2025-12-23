"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send } from "lucide-react";
import Image from "next/image";

export default function PlayerInteractionModal({
  isOpen,
  onClose,
  player = {
    name: "John Doe",
    image: "/player/profile/profile.png",
    status: "Active now",
  },
  theme = {
    colors: {
      primaryCyan: theme.colors.primaryCyan,
      backgroundCard: theme.colors.backgroundCard,
      backgroundDark: theme.colors.backgroundDark,
    },
  },
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm very interested in your upcoming trial.",
      time: "10:30 AM",
      sender: "scout",
    },
    {
      text: "Hi John! Thank you for your interest. I'd be happy to provide more details.",
      time: "10:45 AM",
      sender: "player",
    },
    {
      text: "That would be great! What are the requirements?",
      time: "11:00 AM",
      sender: "scout",
    },
    {
      text: "The trial is open to players aged 16-21. You'll need to bring your sports gear and be prepared for physical tests.",
      time: "11:05 AM",
      sender: "player",
    },
  ]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { text: message, time: "11:10 AM", sender: "scout" },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl w-full max-w-2xl shadow-2xl border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard || "#0F1129",
          borderColor: `${theme.colors.primaryCyan}33` || "#04B5A333",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{
            borderColor: `${theme.colors.primaryCyan}33` || "#04B5A333",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={player.image}
                alt={player.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold">{player.name}</h3>
              <p className="text-green-400 text-sm">{player.status}</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-4 text-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "scout" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-4 rounded-lg ${
                  msg.sender === "scout"
                    ? `bg-gray-700 text-gray-100`
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                }`}
                style={{
                  backgroundColor:
                    msg.sender === "scout"
                      ? theme.colors.backgroundDark
                      : "transparent",
                }}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          className="p-6 border-t"
          style={{
            borderColor: `${theme.colors.primaryCyan}33` || "#04B5A333",
          }}
        >
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 h-12 rounded-xl"
              style={{
                backgroundColor: theme.colors.backgroundDark || "#1A1C38",
                borderColor: `${theme.colors.primaryCyan}33` || "#04B5A333",
              }}
            />
            <Button
              variant="outline"
              onClick={handleSend}
              className="rounded-xl px-6"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
