/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Search, Send, Loader2, MessageSquare, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  useGetConversationsQuery, 
  useGetMessagesQuery, 
  useSendReplyMutation,
} from "@/redux/features/chat/chatApi";
import { Conversation, ChatMessage } from "@/types/chat/chatType";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

const PlayerMessagingPage = () => {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get("userId");
  const targetConvId = searchParams.get("id");

  const [selectedConvId, setSelectedConvId] = useState<number | string | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(urlUserId);

  useEffect(() => {
    const saved = localStorage.getItem("player_lastMessagingState");
    const parsed = saved ? JSON.parse(saved) : null;

    if (urlUserId || targetConvId) {
      if (urlUserId) setTargetUserId(urlUserId);
      if (targetConvId) setSelectedConvId(Number(targetConvId));
    } else if (parsed) {
      if (parsed.selectedConvId) setSelectedConvId(parsed.selectedConvId);
      if (parsed.targetUserId) setTargetUserId(parsed.targetUserId);
    }
  }, [urlUserId, targetConvId]);

  useEffect(() => {
    if (selectedConvId || targetUserId) {
      localStorage.setItem("player_lastMessagingState", JSON.stringify({
        selectedConvId,
        targetUserId
      }));
    }
  }, [selectedConvId, targetUserId]);

  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data: convsData, isLoading: loadingConvs } = useGetConversationsQuery(undefined, {
    pollingInterval: 5000,
  });
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesQuery(selectedConvId as number, {
    skip: !selectedConvId,
    pollingInterval: 3000,
  });
  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  const conversations: Conversation[] = useMemo(() => convsData?.conversations || [], [convsData]);
  // Real API returns { conversationId, messages: [...] } not { results: [...] }
  const messages: ChatMessage[] = useMemo(() => {
    const msgs = messagesData?.messages || messagesData?.results || [];
    // Ensure chronological order (oldest to newest)
    return [...msgs].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateA - dateB;
    });
  }, [messagesData]);

  // Helper: compare IDs regardless of type (string "USR-00020" or number)
  const sameId = useCallback(
    (
      a: string | number | undefined | null,
      b: string | number | undefined | null,
    ) => {
      if (!a || !b) return false;
      const normalize = (id: string | number) =>
        String(id).replace("USR-", "").replace(/^0+/, "");
      return normalize(a) === normalize(b);
    },
    [],
  );

  const selectedConv = useMemo(() => 
    conversations.find((c) => selectedConvId !== null && sameId(c.id, selectedConvId))
  , [conversations, selectedConvId, sameId]);

  const filteredConvs = useMemo(() => 
    conversations.filter((conv) =>
      (conv.other_participant?.name || "").toLowerCase().includes(search.toLowerCase())
    )
  , [conversations, search]);



  useEffect(() => {
    if (conversations.length > 0 && !initialSelectionDone.current) {
      let nextId: number | string | null = null;
      if (targetConvId) {
        // Fix 403: Only select if the user is actually a participant
        const convExists = conversations.some(c => sameId(c.id, targetConvId));
        if (convExists) {
          nextId = isNaN(Number(targetConvId)) ? targetConvId : Number(targetConvId);
        } else {
          // Fallback to first available if illegal ID in URL
          nextId = conversations[0].id;
        }
      } else if (targetUserId) {
        const found = conversations.find((c: Conversation) =>
          sameId(c.other_participant?.id, targetUserId)
        );
        if (found) {
          nextId = found.id;
        } else if (selectedConvId === null) {
          nextId = conversations[0].id;
        }
      } else if (selectedConvId === null) {
        nextId = conversations[0].id;
      }

      if (nextId !== null && nextId !== selectedConvId) {
        setSelectedConvId(nextId);
        if (nextId !== conversations[0].id || targetUserId || targetConvId) {
          initialSelectionDone.current = true;
        }
      } else if (conversations.length > 0 && selectedConvId === null) {
        setSelectedConvId(conversations[0].id);
        initialSelectionDone.current = true;
      }
    }
  }, [conversations, selectedConvId, targetConvId, targetUserId, sameId]);

 const handleSend = async () => {
    if (!inputValue.trim() || !selectedConv) return;
    try {
      const receiverId = selectedConv?.other_participant?.id;
      if (!receiverId) {
        toast.error("Cannot identify recipient");
        return;
      }

      await sendReply({
        conversation_id: selectedConv.id as number,
        message: inputValue.trim(),
        receiver_id: receiverId,
      }).unwrap();
      setInputValue("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const scroll = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      };
      // Short delay to ensure DOM has rendered new batch
      const timer = setTimeout(scroll, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, loadingMessages]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full overflow-hidden relative bg-[#080D28] p-4 md:p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent px-2">
        Messaging
      </h1>

      <div className="flex flex-1 overflow-hidden bg-[#12143A] rounded-[24px] border border-white/5 shadow-2xl relative">
        {/* Left Sidebar - Chat List */}
        <div
          className={cn(
            "flex flex-col border-r border-white/5 shrink-0 transition-all",
            "w-full md:w-80 lg:w-96",
            selectedConvId && "hidden md:flex",
          )}
        >
          <div className="p-5 border-b border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within/search:text-white" />
              <Input
                placeholder="Search messages..."
                className="pl-11 bg-[#080D28]/50 border-white/10 text-white placeholder:text-white/20 rounded-xl h-11 focus:border-purple-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loadingConvs ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]" />
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="px-8 py-12 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#242E5A] text-gray-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No Active Channels</p>
              </div>
            ) : (
              <div className="space-y-1 p-3">
                {filteredConvs.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 cursor-pointer transition-all duration-300 rounded-xl relative overflow-hidden",
                      selectedConvId === conv.id 
                        ? "bg-gradient-to-r from-[#242E5A] to-[#1A2049] shadow-lg" 
                        : "hover:bg-white/5"
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar className={cn(
                        "h-14 w-14 transition-all duration-300",
                        selectedConvId === conv.id ? "ring-2 ring-purple-500" : "ring-0"
                      )}>
                        <AvatarImage src={conv.other_participant?.avatar || undefined} className="object-cover" />
                        <AvatarFallback className="bg-[#1A2049] text-white font-bold text-xl">
                          {(conv.other_participant?.name || "U").split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {conv.unread_count > 0 && (
                        <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#9C27B0] rounded-full text-[10px] font-bold text-white border-2 border-[#12143A]">
                          {conv.unread_count}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className={cn(
                          "font-bold truncate text-[16px]",
                          selectedConvId === conv.id ? "text-white" : "text-white/80"
                        )}>{conv.other_participant?.name}</p>
                        <span className="text-[11px] text-white/40 whitespace-nowrap font-medium">
                          {conv.last_message?.created_at ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 truncate">
                        {conv.last_message?.content || "Message open"}
                      </p>
                      <div className="mt-1 flex gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-900/40 text-cyan-400 text-[10px] font-bold uppercase">
                          {conv.other_participant?.role?.toLowerCase() || "user"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0B0D28] relative overflow-hidden">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="shrink-0 p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-[#0B0D28] sticky top-0 z-30">
                <div className="flex items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-white/10 transition-transform">
                      <AvatarImage src={selectedConv.other_participant?.avatar || undefined} className="object-cover" />
                      <AvatarFallback className="bg-[#1A2049] font-bold text-lg">
                        {(selectedConv.other_participant?.name || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-[#00E5FF] border-2 border-[#12143A] rounded-full shadow-[0_0_8px_#00E5FF]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg tracking-tight">
                      {selectedConv.other_participant?.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-400/80 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      Active now
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden text-white/50 p-2"
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar bg-[#080D28]">
                {!loadingMessages && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-20">
                    <div className="h-20 w-20 bg-[#1A2049] rounded-full flex items-center justify-center mb-6 border border-white/5">
                      <MessageSquare className="h-10 w-10 text-white/40" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Channel Open</h3>
                  </div>
                ) : (
                  <div className="mx-auto space-y-6 pb-4">
                    {messages.map((msg, idx) => {
                      const isOwn =
                        msg.is_sender === true ||
                        msg.is_own === true ||
                        msg.isOwn === true ||
                        (msg.sender && currentUser?.id && sameId(msg.sender, currentUser.id));
                      
                      return (
                        <div key={msg.id || idx} className={cn(
                          "flex flex-col gap-1", 
                          isOwn ? "items-end" : "items-start"
                        )}>
                          <div className={cn(
                            "max-w-[80%] px-4 py-3 leading-relaxed text-[15px]",
                            isOwn
                              ? "bg-[#9C27B0] text-white rounded-[18px] rounded-tr-none shadow-lg"
                              : "bg-[#1E2554] text-white/90 rounded-[18px] rounded-tl-none border border-white/5 shadow-md",
                          )}>
                            <p>{msg.content || msg.text || msg.message}</p>
                          </div>
                          <p className="text-[10px] text-white/20 mt-1 font-medium px-1">
                            {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </p>
                        </div>
                      );
                    })}
                    {loadingMessages && (
                      <div className="flex justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin text-[#00E5FF]/40" />
                      </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="shrink-0 p-4 md:p-6 border-t border-white/5 bg-[#080D28]">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                  <div className="relative flex-1 group">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="w-full bg-[#12143A]/50 border-white/5 text-white placeholder:text-white/20 rounded-xl h-12 px-6 focus:border-purple-500 transition-all"
                      disabled={isSending}
                    />
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isSending}
                    className={cn(
                      "h-12 w-12 flex items-center justify-center rounded-xl transition-all relative overflow-hidden group/btn shadow-md",
                      !inputValue.trim() || isSending 
                        ? "bg-white/5 text-white/20" 
                        : "bg-[#00E5FF] text-[#080D28] hover:scale-105 active:scale-95"
                    )}
                  >
                    {isSending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5 fill-current" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#00E5FF]/20 gap-6">
              <div className="h-32 w-32 rounded-full bg-[#1A2049] border-2 border-[#2A3560] flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/5 to-transparent animate-pulse" />
                <MessageSquare className="h-12 w-12" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-white/40 tracking-tighter uppercase mb-2">Terminal Standby</p>
                <p className="text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase">Select Active Channel to Monitor</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2A3560;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00E5FF44;
        }
      `}</style>
    </div>
  );
};

export default PlayerMessagingPage;