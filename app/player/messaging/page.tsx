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
  const [selectedConvId, setSelectedConvId] = useState<number | string | null>(null);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("userId");
  const targetConvId = searchParams.get("id");
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data: convsData, isLoading: loadingConvs } = useGetConversationsQuery();
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesQuery(selectedConvId as number, {
    skip: !selectedConvId,
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
  const sameId = useCallback((a: string | number | undefined, b: string | number | undefined) =>
    a !== undefined && b !== undefined && String(a) === String(b), []);

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
    if (!inputValue.trim() || !selectedConvId) return;

    try {
      await sendReply({
        conversation_id: selectedConvId as number | string,
        message: inputValue.trim(),
      }).unwrap();
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Frequency jammed.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
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
    <div className="flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden relative group/page">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#9C27B0]/5 rounded-full blur-[120px] pointer-events-none" />

      <h1 className="text-3xl font-black mb-6 px-2 tracking-tight flex items-center gap-3">
        <span className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Secure Comms
        </span>
        <div className="h-1 flex-1 bg-gradient-to-r from-[#2A3560] to-transparent rounded-full opacity-20" />
      </h1>

      <div className="flex flex-1 overflow-hidden bg-[#1A2049]/40 backdrop-blur-xl rounded-[32px] border border-[#2A3560]/50 shadow-2xl relative">
        {/* Left Sidebar - Chat List */}
        <div className="hidden md:flex md:w-80 lg:w-100 flex-col border-r border-[#2A3560]/40 bg-[#1A2049]/60">
          <div className="p-6">
            <div className="relative group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00E5FF]/40 group-focus-within/search:text-[#00E5FF] transition-colors" />
              <Input
                placeholder="Search database..."
                className="pl-11 bg-[#0B1229]/60 border-[#2A3560] text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50 rounded-2xl h-12 transition-all border-2"
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
                      "flex items-center gap-4 px-4 py-4 cursor-pointer transition-all duration-300 rounded-2xl group relative overflow-hidden",
                      selectedConvId === conv.id 
                        ? "bg-gradient-to-r from-[#242E5A] to-[#1A2049] shadow-lg border border-[#00E5FF]/20" 
                        : "hover:bg-[#242E5A]/40 border border-transparent"
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar className={cn(
                        "h-14 w-14 transition-all duration-300 ring-2",
                        selectedConvId === conv.id ? "ring-[#00E5FF]/40 scale-105 shadow-lg shadow-[#00E5FF]/10" : "ring-transparent group-hover:ring-[#00E5FF]/10"
                      )}>
                        <AvatarImage src={conv.other_participant?.avatar || undefined} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-[#1A2049] to-[#242E5A] text-white font-black text-xl border border-[#2A3560]">
                          {(conv.other_participant?.name || "U").split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className={cn(
                          "font-bold truncate text-[15px] transition-colors",
                          selectedConvId === conv.id ? "text-white" : "text-gray-300 group-hover:text-[#00E5FF]"
                        )}>{conv.other_participant?.name}</p>
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest whitespace-nowrap">
                          {conv.last_message?.created_at ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate font-semibold opacity-70">
                        {conv.last_message?.content || "Channel open"}
                      </p>
                    </div>

                    {conv.unread_count > 0 && (
                      <Badge className="bg-[#00E5FF] text-[#1A2049] font-black text-[10px] h-5 min-w-[20px] rounded-full flex items-center justify-center p-0 shadow-[0_0_10px_#00E5FF44]">
                        {conv.unread_count}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-[#1A2049]/40 to-[#0B1229]/40 relative">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="shrink-0 p-5 md:p-6 border-b border-[#2A3560]/40 flex items-center justify-between bg-[#1A2049]/80 backdrop-blur-2xl sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <Avatar className="h-12 w-12 md:h-14 md:w-14 ring-2 ring-[#00E5FF]/40 border-2 border-[#1A2049] transition-transform group-hover:scale-105">
                      <AvatarImage src={selectedConv.other_participant?.avatar || undefined} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-tr from-[#1A2049] to-[#242E5A] font-black text-lg">
                        {(selectedConv.other_participant?.name || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-4 w-4 bg-[#00E5FF] border-2 border-[#1A2049] rounded-full shadow-[0_0_8px_#00E5FF]" />
                  </div>
                  <div>
                    <h2 className="font-black text-white text-lg md:text-xl tracking-tight leading-none mb-1.5">
                      {selectedConv.other_participant?.name}
                    </h2>
                    <div className="flex items-center gap-2 text-[10px] text-[#00E5FF]/80 font-black uppercase tracking-[0.15em]">
                      <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_5px_#00E5FF]" />
                      Active Connection
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <button title="Options" className="p-3 rounded-2xl bg-[#242E5A]/80 border border-[#2A3560]/50 text-[#00E5FF]/60 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1 custom-scrollbar scroll-smooth bg-[#0B1229]">
                {!loadingMessages && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12">
                    <div className="h-20 w-20 bg-[#242E5A] rounded-full flex items-center justify-center mb-6 shadow-2xl border border-[#2A3560]">
                      <MessageSquare className="h-10 w-10 text-[#00E5FF]/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure Link Established</h3>
                    <p className="text-sm text-gray-500 max-w-xs font-semibold">Initiate formal communication via the encrypted terminal below.</p>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto space-y-1 pb-4">
                    {messages.map((msg, idx) => {
                      const isOwn =
                        msg.is_sender === true ||
                        msg.is_own === true ||
                        msg.isOwn === true ||
                        (msg.sender && currentUser?.id && sameId(msg.sender, currentUser.id));
                      
                      const nextMsg = idx < messages.length - 1 ? messages[idx + 1] : null;
                      const prevMsg = idx > 0 ? messages[idx - 1] : null;

                      const nextIsOwn = nextMsg ? (
                        nextMsg.is_sender === true ||
                        nextMsg.is_own === true ||
                        nextMsg.isOwn === true ||
                        (nextMsg.sender && currentUser?.id && sameId(nextMsg.sender, currentUser.id))
                      ) : null;

                      const prevIsOwn = prevMsg ? (
                        prevMsg.is_sender === true ||
                        prevMsg.is_own === true ||
                        prevMsg.isOwn === true ||
                        (prevMsg.sender && currentUser?.id && sameId(prevMsg.sender, currentUser.id))
                      ) : null;

                      const isFirstInGroup = prevIsOwn !== isOwn;
                      const isLastInGroup = nextIsOwn !== isOwn;
                      const showAvatar = !isOwn && isLastInGroup;

                      return (
                        <div key={msg.id || idx} className={cn(
                          "flex group/msg animate-in fade-in slide-in-from-bottom-2 duration-300", 
                          isOwn ? "justify-end" : "justify-start",
                          isFirstInGroup && idx !== 0 ? "mt-4" : "mt-0"
                        )}>
                          {!isOwn && (
                            <div className="w-10 shrink-0 flex items-end">
                              {showAvatar ? (
                                <Avatar className="h-8 w-8 ring-2 ring-[#2A3560] border-2 border-[#1A2049] shadow-lg mb-1">
                                  <AvatarImage src={selectedConv.other_participant?.avatar || undefined} />
                                  <AvatarFallback className="text-[10px] bg-[#1A2049] font-black">AI</AvatarFallback>
                                </Avatar>
                              ) : <div className="w-8" />}
                            </div>
                          )}
                          <div className={cn(
                            "max-w-[85%] md:max-w-[70%] relative flex flex-col",
                            isOwn ? "items-end" : "items-start"
                          )}>
                            <div className={cn(
                              "px-4 py-2.5 shadow-sm relative transition-all duration-200",
                              isOwn
                                ? "bg-[#0084ff] text-white border border-white/5"
                                : "bg-[#242E5A] text-gray-100 border border-[#2A3560]",
                              // Sequence-aware rounding
                              isOwn 
                                ? cn(
                                    "rounded-[20px]",
                                    isFirstInGroup ? "rounded-tr-[4px]" : "rounded-tr-[4px]",
                                    !isFirstInGroup && "rounded-tr-[4px]",
                                    !isLastInGroup && "rounded-br-[4px]"
                                  )
                                : cn(
                                    "rounded-[20px]",
                                    isFirstInGroup ? "rounded-tl-[4px]" : "rounded-tl-[4px]",
                                    !isFirstInGroup && "rounded-tl-[4px]",
                                    !isLastInGroup && "rounded-bl-[4px]"
                                  )
                            )}>
                              <p className="text-[14px] md:text-[15px] leading-normal font-medium tracking-wide">
                                {msg.content || msg.text || msg.message}
                              </p>
                              
                              {isLastInGroup && (
                                <div className={cn(
                                  "flex items-center gap-1.5 mt-1 opacity-50",
                                  isOwn ? "justify-end" : "justify-start"
                                )}>
                                  <span className="text-[9px] font-bold uppercase tracking-wider">
                                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (msg.time || '')}
                                  </span>
                                  {isOwn && (
                                    <div className="flex items-center text-[#00E5FF]">
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
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

              {/* Input Area - Fixed At Bottom */}
              <div className="shrink-0 p-5 md:p-8 border-t border-[#2A3560]/40 bg-[#1A2049]/95 backdrop-blur-2xl sticky bottom-0 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
                <div className="max-w-5xl mx-auto flex items-center gap-3 md:gap-5 px-4 relative">
                  <div className="relative flex-1 group">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Encrypted data transmission..."
                      className="w-full bg-[#0B1229]/80 border-[#2A3560] text-white placeholder:text-gray-600 focus:border-[#00E5FF]/60 rounded-[24px] h-14 md:h-16 px-8 py-4 transition-all duration-300 focus:ring-[12px] focus:ring-[#00E5FF]/5 text-sm md:text-lg font-bold border-2 shadow-inner"
                      disabled={isSending}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
                       <div className="flex items-center gap-1.5 opacity-30 group-focus-within:opacity-80 transition-opacity">
                          <span className="text-[10px] font-black text-gray-500 tracking-widest">SEND</span>
                          <kbd className="px-2 py-1 text-[9px] font-black bg-[#1A2049] border border-[#2A3560] rounded-lg text-white shadow-sm">CMD + ↵</kbd>
                       </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isSending}
                    className={cn(
                      "h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-[24px] transition-all duration-500 relative overflow-hidden group/btn shadow-2xl",
                      !inputValue.trim() || isSending 
                        ? "bg-[#242E5A] opacity-40 cursor-not-allowed border border-[#2A3560]" 
                        : "bg-gradient-to-br from-[#00E5FF] to-[#01BCD4] hover:shadow-[0_0_30px_#00E5FF44] active:scale-90 border-2 border-white/10"
                    )}
                  >
                    {isSending ? (
                      <Loader2 className="h-7 w-7 animate-spin text-[#1A2049]" />
                    ) : (
                      <div className="relative z-10">
                        <Send className="h-7 w-7 text-[#1A2049] fill-current -rotate-12 translate-x-0.5 transition-transform group-hover/btn:scale-110" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
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