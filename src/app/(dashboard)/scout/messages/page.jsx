"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ScoutMessagingPage() {
  const theme = useSelector((state) => state.theme);
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: 0,
      name: "Alex Johnson",
      avatar: "/user_pp.jpg",
      lastMessage: "Available for a trial next week",
      time: "2h ago",
      unread: 2,
      active: true,
      status: "Active now",
      messages: [
        {
          text: "Hi, I heard you were looking for midfielders for your team.",
          time: "10:30 AM",
          sender: "them",
        },
        {
          text: "Yes, I'm always looking for talented players. Can you tell me more about yourself?",
          time: "10:45 AM",
          sender: "me",
        },
      ],
    },
    {
      id: 1,
      name: "Sarah Player",
      avatar: "/sarah_player.jpg", // placeholder player
      lastMessage: "I can provide full match footage",
      time: "5h ago",
      unread: 1,
      active: false,
      status: "Active 2h ago",
      messages: [
        {
          text: "Hi, I'm a forward looking for opportunities.",
          time: "9:15 AM",
          sender: "them",
        },
      ],
    },
    {
      id: 2,
      name: "Youth Academy FC",
      avatar: "/Barcelona_Youth_Trial.png",
      lastMessage: "Trial session scheduled for next Monday",
      time: "1d ago",
      unread: 0,
      active: false,
      status: "Active 1d ago",
      messages: [
        {
          text: "We'd like to invite some of your recommended players for a trial.",
          time: "11:30 AM",
          sender: "them",
        },
        {
          text: "Great! I have a few players in mind who would be perfect for your team.",
          time: "11:15 AM",
          sender: "me",
        },
      ],
    },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Create a new message object
      const newMessage = {
        text: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }), // Current time
        sender: "me",
      };

      // Update the selected conversation with the new message
      const updatedConversations = [...conversations];
      updatedConversations[selectedConversation] = {
        ...updatedConversations[selectedConversation],
        messages: [
          ...updatedConversations[selectedConversation].messages,
          newMessage,
        ],
        lastMessage: messageInput, // Update last message
        time: "Just now", // Update time
      };

      setConversations(updatedConversations);
      setMessageInput("");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Conversations List */}
      <div
        className="w-full lg:w-96 border rounded-lg flex flex-col"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <h2 className="text-xl font-bold text-white">Conversations</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation?.id}
              onClick={() => setSelectedConversation(conversation?.id)}
              className="w-full p-4 flex items-center gap-3 border-b transition-colors"
              style={{
                backgroundColor:
                  selectedConversation === conversation?.id
                    ? `${theme.colors.backgroundDark}80`
                    : "transparent",
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conversation?.avatar}
                  alt={conversation?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation?.unread > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: theme.colors.primaryMagenta }}
                  >
                    {conversation?.unread}
                  </span>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-semibold text-sm">
                    {conversation?.name}
                  </p>
                  <span className="text-xs text-gray-400">
                    {conversation?.time}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {conversation?.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="hidden lg:flex flex-1 border rounded-lg flex-col"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        {/* Chat Header */}
        <div
          className="p-4 border-b flex items-center gap-3"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <img
            src={conversations[selectedConversation].avatar}
            alt={conversations[selectedConversation].name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">
              {conversations[selectedConversation].name}
            </p>
            <p className="text-xs text-gray-400">
              {conversations[selectedConversation].status}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 p-6 overflow-y-auto space-y-4"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          {conversations[selectedConversation].messages.map(
            (message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-md px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor:
                      message.sender === "me"
                        ? theme.colors.primaryMagenta
                        : theme.colors.backgroundCard,
                  }}
                >
                  <p className="text-white text-sm mb-1">{message.text}</p>
                  <p className="text-xs opacity-70 text-white">
                    {message.time}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Message Input */}
        <div
          className="p-4 border-t"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <div className="flex gap-3">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-lg transition-all"
              style={{ backgroundColor: theme.colors.neonAccent }}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
