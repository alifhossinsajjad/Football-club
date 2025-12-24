"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PlayerTitle from "@/components/player/playerTitle";

const conversations = [
  {
    id: 1,
    name: "FC Barcelona Youth",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Barcelona-Logo.png",
    lastMessage: "We are interested in your profile...",
    time: "2h ago",
    unread: 2,
    active: true,
    messages: [
      {
        text: "Hello John, we reviewed your profile and we are very impressed!",
        time: "10:30 AM",
        incoming: true,
      },
      {
        text: "Thank you! I am very interested in your academy.",
        time: "10:45 AM",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "Mike Scout",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/atletico-madrid-Logo.png", // placeholder scout logo
    lastMessage: "Great highlight reel!",
    time: "5h ago",
    unread: 1,
    active: false,
    messages: [
      { text: "Great highlight reel!", time: "9:15 AM", incoming: true },
    ],
  },
  {
    id: 3,
    name: "Real Madrid Academy",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/010/994/249/small/real-madrid-logo-symbol-design-spain-football-european-countries-football-teams-illustration-free-vector.jpg",
    lastMessage: "Thank you for your interest...",
    time: "1d ago",
    unread: 0,
    active: false,
    messages: [
      {
        text: "We would like to invite you to our upcoming trial on September 15th.",
        time: "11:30 AM",
        incoming: true,
      },
      {
        text: "That sounds great! What do I need to prepare?",
        time: "11:15 AM",
        incoming: false,
      },
    ],
  },
];

export default function MessagingPage() {
  const theme = useSelector((state) => state.theme);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <section>
      <PlayerTitle title="Messaging" />
      <div
        className="h-[calc(80vh)]  flex flex-col lg:flex-row rounded-xl overflow-hidden"
        style={{ backgroundColor: theme.colors.backgroundCard }}
      >
        {/* Conversations List - Hidden on mobile when chat is open */}
        <div
          className={`w-full lg:w-96 border-r ${
            isMobileView && selectedConversation ? "hidden" : "block"
          }`}
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <div className="p-6">
            <h1 className="text-xl font-bold text-white">Conversations</h1>
          </div>
          <div className="space-y-2 overflow-y-auto h-full pb-32 lg:pb-0">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv);
                  setIsMobileView(true); // Simulate mobile behavior
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all hover:opacity-90 ${
                  selectedConversation.id === conv.id ? "opacity-100" : ""
                }`}
                style={{
                  backgroundColor:
                    selectedConversation.id === conv.id
                      ? `${theme.colors.primaryCyan}1A`
                      : "transparent",
                }}
              >
                <div className="relative">
                  <img
                    src={conv.logo}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-contain"
                    style={{ backgroundColor: "#1e1e3f" }}
                  />
                  {conv.unread > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: theme.colors.primaryMagenta }}
                    >
                      {conv.unread}
                    </span>
                  )}
                  {conv.active && (
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-backgroundCard"
                      style={{ backgroundColor: "#05DF72" }}
                    />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-white">{conv.name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div
          className={`flex-1 flex flex-col ${
            !isMobileView && selectedConversation ? "hidden lg:flex" : "flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div
                className="p-4 lg:p-6 border-b flex items-center gap-4"
                style={{ borderColor: `${theme.colors.primaryCyan}33` }}
              >
                {isMobileView && (
                  <button onClick={() => setIsMobileView(false)}>
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                )}
                <img
                  src={selectedConversation.logo}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-contain"
                  style={{ backgroundColor: "#1e1e3f" }}
                />
                <div>
                  <h2 className="font-semibold text-white">
                    {selectedConversation.name}
                  </h2>
                  {selectedConversation.active && (
                    <span className="text-sm" style={{ color: "#05DF72" }}>
                      Active now
                    </span>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                {selectedConversation.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.incoming ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.incoming
                          ? "rounded-tl-none bg-gray-800"
                          : "rounded-tr-none"
                      }`}
                      style={{
                        backgroundColor: msg.incoming
                          ? theme.colors.backgroundDark
                          : theme.colors.primaryMagenta,
                      }}
                    >
                      <p className="text-white text-sm lg:text-base">
                        {msg.text}
                      </p>
                      <span className="text-xs opacity-70 text-white block mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div
                className="p-4 lg:p-6 border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}33` }}
              >
                <div className="flex gap-3">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full text-white"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                  <Button
                    variant="common"
                    onClick={handleSendMessage}
                    className="rounded-full w-12 h-12 p-0"
                    style={{
                      boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3)",
                    }}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
