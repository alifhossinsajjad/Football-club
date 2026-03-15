"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  useGetConversationsQuery, 
  useGetMessagesQuery, 
  useSendMessageMutation 
} from "@/redux/features/chat/chatApi";
import { Conversation, ChatMessage, ChatResponse, MessageResponse } from "../../../types/chat/chatType";

const ScoutMessagingPage = () => {
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversationsData, isLoading: loadingConvs } = useGetConversationsQuery(undefined);
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesQuery(selectedConvId, {
    skip: !selectedConvId,
  });
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const conversations: Conversation[] = Array.isArray(conversationsData)
    ? conversationsData
    : (conversationsData as ChatResponse)?.results || [];
  const messages: ChatMessage[] = Array.isArray(messagesData)
    ? messagesData
    : (messagesData as MessageResponse)?.results || [];

  const selectedConv = conversations.find((c) => Number(c.id) === Number(selectedConvId));

  const filteredConvs = conversations.filter((conv) =>
    (conv.name || conv.user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (conversations.length > 0 && !selectedConvId) {
      setSelectedConvId(conversations[0].id);
    }
  }, [conversations, selectedConvId]);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedConvId) return;

    try {
      await sendMessage({
        conversation: selectedConvId,
        text: inputValue.trim(),
      }).unwrap();
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
        Scout Messaging
      </h1>
      <div className="min-h-screen bg-[#1A2049] text-white flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Chat List */}
          <div className="hidden md:flex md:w-80 lg:w-96 flex-col border-r border-[#2A3560]/70 bg-[#1A2049]">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00E5FF]/60" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 bg-[#242E5A] border-[#2A3560] text-white placeholder:text-gray-400 focus:border-[#00E5FF]/60 rounded-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingConvs ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[#00E5FF]" />
                </div>
              ) : filteredConvs.length === 0 ? (
                <div className="p-4 text-center text-gray-400">No conversations found</div>
              ) : (
                filteredConvs.map((conv: Conversation) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors border-b border-[#2A3560]/30 last:border-b-0",
                      selectedConvId === conv.id ? "bg-[#242E5A]" : "hover:bg-[#242E5A]/60"
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar className="h-12 w-12 ring-1 ring-[#00E5FF]/20">
                        <AvatarImage src={(conv.avatar || conv.user?.avatar) || undefined} alt={conv.name || conv.user?.name} />
                        <AvatarFallback className="bg-[#9C27B0]/40 text-white">
                          {(conv.name || conv.user?.name || "U").split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conv.active && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#1A2049] shadow-[0_0_8px_#00ff9f]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="font-semibold truncate">{conv.name || conv.user?.name}</p>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{conv.last_message_time || conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-300 truncate mt-0.5">{conv.last_message || conv.message}</p>
                    </div>

                    {conv.unread_count > 0 && (
                      <Badge className="bg-[#9C27B0] hover:bg-[#9C27B0]/90 text-white text-xs px-2 py-0.5">
                        {conv.unread_count}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Chat Area */}
          <div className="flex-1 flex flex-col bg-[#1A2049] overflow-hidden">
            {selectedConv ? (
              <>
                <div className="sticky top-0 z-10 p-4 border-b border-[#2A3560]/70 flex items-center gap-3 bg-[#1A2049]/95 backdrop-blur-md">
                  <Avatar className="h-10 w-10 ring-1 ring-[#00E5FF]/30">
                    <AvatarImage src={(selectedConv.avatar || selectedConv.user?.avatar) || undefined} />
                    <AvatarFallback className="bg-[#9C27B0]/50">
                      {(selectedConv?.name || selectedConv?.user?.name || "U")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg">{selectedConv.name || selectedConv.user?.name}</h2>
                    <p className="text-sm text-[#00E5FF]/80 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                      Active now
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {loadingMessages ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]" />
                    </div>
                  ) : (messages.length === 0) ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isOwn = msg.is_sender || msg.isOwn;
                      return (
                        <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                          <div
                            className={cn(
                              "max-w-[80%] px-5 py-3 rounded-2xl shadow-md",
                              isOwn
                                ? "bg-[#9C27B0] text-white rounded-br-none"
                                : "bg-[#00E5FF] text-[#1A2049] rounded-bl-none"
                            )}
                          >
                            <p className="text-[15px] leading-relaxed">{msg.text || msg.content}</p>
                            <p className="text-xs mt-2 opacity-80 text-right">{msg.created_at || msg.time}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="sticky bottom-0 z-10 p-4 border-t border-[#2A3560]/70 bg-[#1A2049]/95 backdrop-blur-md">
                  <div className="flex items-center gap-3 max-w-5xl mx-auto">
                    <button className="p-3 rounded-xl hover:bg-[#00E5FF]/10 transition-colors shrink-0">
                      <Paperclip className="h-5 w-5 text-[#00E5FF]/80" />
                    </button>

                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#242E5A] border-[#2A3560] text-white placeholder:text-gray-400 focus:border-[#00E5FF]/70 rounded-xl"
                      disabled={isSending}
                    />

                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isSending}
                      className="p-3.5 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] rounded-xl text-white hover:opacity-90 transition-all shadow-lg shadow-[#9C27B0]/30 disabled:opacity-50 shrink-0"
                    >
                      {isSending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#00E5FF]/70">
                {loadingConvs ? <Loader2 className="h-8 w-8 animate-spin" /> : "Select a conversation to start messaging"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutMessagingPage;