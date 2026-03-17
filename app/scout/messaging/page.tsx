"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { Search, Send, Loader2, MessageSquare, MessageCircle, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  useGetConversationsQuery, 
  useGetMessagesQuery, 
  useSendReplyMutation,
  useCreateConversationMutation
} from "@/redux/features/chat/chatApi";
import { useGetPlayerByIdQuery } from "@/redux/features/scout/playerDiscoverApi";
import { Conversation, ChatMessage } from "../../../types/chat/chatType";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

const MessagingContent = () => {
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("userId");
  const targetConvId = searchParams.get("id");
  // Get logged-in user's numeric ID to determine message ownership
  const currentUser = useAppSelector((state) => state.auth.user);

  // Helper: compare IDs regardless of type (string "USR-00020" or number)
  const sameId = React.useCallback((a: string | number | undefined, b: string | number | undefined) =>
    a !== undefined && b !== undefined && String(a) === String(b), []);

  const { data: convsData, isLoading: loadingConvs } = useGetConversationsQuery();
  const [createConversation, { isLoading: isCreating }] = useCreateConversationMutation();

  const { data: targetPlayerData, isLoading: loadingTargetPlayer } = useGetPlayerByIdQuery(Number(targetUserId), {
    skip: !targetUserId,
  });
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesQuery(selectedConvId, {
    // Skip when no conversation selected OR when it's a virtual conversation (id=-1)
    skip: !selectedConvId || selectedConvId === -1,
  });
  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  const rawConversations: Conversation[] = convsData?.conversations || [];



  // Logic for Virtual Conversation
  const conversations = React.useMemo(() => {
    const list = [...rawConversations];
    // Only add virtual conversation if no existing conversation with that participant
    if (targetUserId && targetPlayerData && !list.some(c => sameId(c.other_participant?.id, targetUserId))) {
      const virtualConv: Conversation = {
        id: -1, // Use -1 as a flag for virtual/new conversation
        other_participant: {
          id: targetPlayerData.id,
          name: `${targetPlayerData.first_name} ${targetPlayerData.last_name}`,
          avatar: targetPlayerData.profile_image || null,
          role: "PLAYER",
        },
        unread_count: 0,
        updated_at: new Date().toISOString(),
      };
      return [virtualConv, ...list];
    }
    return list;
  }, [rawConversations, targetUserId, targetPlayerData]);

  // API returns { conversationId, messages: [...] } — NOT results
  const messages: ChatMessage[] = React.useMemo(() => {
    const msgs = messagesData?.messages || messagesData?.results || [];
    // Ensure chronological order (oldest to newest)
    return [...msgs].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateA - dateB;
    });
  }, [messagesData, sameId]);

  // selectedConv: match by conversation id (numeric) or by participant id (string "USR-XXXXX")
  const selectedConv = React.useMemo(() => {
    return conversations.find((c) => {
      if (selectedConvId === -1) return c.id === -1;
      return selectedConvId !== null && sameId(c.id, selectedConvId);
    });
  }, [conversations, selectedConvId, sameId]);

  const filteredConvs = conversations.filter((conv) =>
    (conv.other_participant?.name || "").toLowerCase().includes(search.toLowerCase())
  );

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
        setSelectedConvId(nextId as number);
        if (nextId !== conversations[0].id || targetUserId || targetConvId) {
           initialSelectionDone.current = true;
        }
      } else if (conversations.length > 0 && selectedConvId === null) {
        // Fallback if none of the above matched but we still have no selection
        setSelectedConvId(conversations[0].id);
        initialSelectionDone.current = true;
      }
    }
  }, [conversations, selectedConvId, targetConvId, targetUserId, sameId]);

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

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    try {
      if (selectedConvId === -1 && targetUserId) {
        // Create new conversation — capture the real conversationId from the response
        const result = await createConversation({
          receiver_id: targetUserId,
          message: inputValue.trim(),
        }).unwrap();
        // Switch to the newly created real conversation so further messages use sendReply
        if (result?.conversationId) {
          setSelectedConvId(result.conversationId);
        }
      } else if (selectedConvId && selectedConvId !== -1) {
        // Reply to existing
        await sendReply({
          conversation_id: selectedConvId,
          message: inputValue.trim(),
        }).unwrap();
      }
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Frequency jammed.");
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
    <div className="p-2 md:p-4 lg:p-6 bg-[#0B1229] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#00E5FF] via-[#9C27B0] to-[#E040FB] bg-clip-text text-transparent drop-shadow-sm tracking-tight shrink-0">
          Scout Messaging
        </h1>
        
        <div className="flex-1 flex bg-[#1A2049] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A3560]/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm relative min-h-0">
          {/* Decorative Glow Elements */}
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#9C27B0]/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Left Sidebar - Chat List */}
          <div className={cn(
            "flex flex-col border-r border-[#2A3560]/50 bg-[#1A2049]/50 backdrop-blur-md transition-all duration-300 relative z-10 shrink-0",
            "w-full md:w-85 lg:w-[400px]",
            selectedConvId && "hidden md:flex"
          )}>
            <div className="p-5 border-b border-[#2A3560]/30 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white tracking-wide">Conversations</h2>
                <div className="flex gap-1">
                  <button className="p-2 rounded-xl hover:bg-[#242E5A] text-[#00E5FF]/70 transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-[#242E5A] text-[#00E5FF]/70 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00E5FF]/40" />
                <Input
                  placeholder="Search scouts & players..."
                  className="pl-11 bg-[#242E5A]/80 border-[#2A3560] text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50 rounded-2xl h-11 transition-all focus:ring-4 focus:ring-[#00E5FF]/5 border-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {loadingConvs ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]/60" />
                  <p className="text-[10px] text-[#00E5FF]/40 font-bold uppercase tracking-[0.2em]">Syncing Feed...</p>
                </div>
              ) : (filteredConvs.length === 0 && !loadingTargetPlayer) ? (
                <div className="flex flex-col items-center justify-center p-10 h-64 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-[#242E5A]/40 flex items-center justify-center mb-4 border border-[#2A3560]/30 shadow-inner">
                    <MessageCircle className="h-8 w-8 text-[#00E5FF]/20" />
                  </div>
                  <p className="text-sm text-gray-400 font-bold opacity-60">No transmission found</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {loadingTargetPlayer && !filteredConvs.some(c => c.id === -1) && (
                     <div className="p-4 flex items-center gap-4 bg-[#242E5A]/20 rounded-2xl animate-pulse border border-[#2A3560]/20">
                        <div className="h-14 w-14 rounded-2xl bg-[#242E5A]/60" />
                        <div className="flex-1 space-y-3">
                           <div className="h-4 w-1/2 bg-[#242E5A]/60 rounded-lg" />
                           <div className="h-3 w-3/4 bg-[#242E5A]/40 rounded-lg" />
                        </div>
                     </div>
                  )}
                  {filteredConvs.map((conv: Conversation) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConvId(conv.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 cursor-pointer transition-all rounded-2xl group relative overflow-hidden mb-1 border-2",
                        selectedConvId === conv.id 
                          ? "bg-gradient-to-r from-[#242E5A] to-[#1A2049] border-[#00E5FF]/20 shadow-xl" 
                          : "hover:bg-[#242E5A]/40 border-transparent hover:border-[#2A3560]/30"
                      )}
                    >
                      {selectedConvId === conv.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]" />
                      )}
                      
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
                        {(conv.id === -1) && (
                          <span className={cn(
                            "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#1A2049] shadow-md z-10",
                            "bg-purple-500 animate-bounce"
                          )} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <p className={cn(
                            "font-bold truncate text-[15px] transition-colors",
                            selectedConvId === conv.id ? "text-white" : "text-gray-300 group-hover:text-[#00E5FF]"
                          )}>{conv.other_participant?.name}</p>
                          <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest whitespace-nowrap">
                            {conv.id === -1 ? "Pending" : (conv.last_message?.created_at ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate font-semibold opacity-70">
                          {conv.id === -1 ? "Initializing secure link..." : (conv.last_message?.content || "")}
                        </p>
                      </div>

                      {conv.unread_count > 0 && (
                        <div className="h-5 min-w-5 flex items-center justify-center bg-[#9C27B0] rounded-lg text-[9px] font-black text-white shadow-lg shadow-[#9C27B0]/30 px-1.5 animate-pulse">
                          {conv.unread_count}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Chat Area */}
          <div className={cn(
            "flex-1 flex flex-col bg-[#0B1229] relative z-0 h-full overflow-hidden min-h-0",
            !selectedConvId && "hidden md:flex"
          )}>
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="shrink-0 p-4 md:p-6 border-b border-[#2A3560]/40 flex items-center justify-between bg-[#1A2049]/90 backdrop-blur-2xl sticky top-0 z-30 shadow-lg shadow-black/20">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedConvId(null)}
                      className="md:hidden p-2.5 rounded-2xl bg-[#242E5A] border border-[#2A3560] text-[#00E5FF]/70 ripple"
                    >
                      <MoreVertical className="h-5 w-5 rotate-90" />
                    </button>
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

                {/* Messages Area - Independent Scroll */}
                <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 custom-scrollbar scroll-smooth relative min-h-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0B1229]/80 via-transparent to-[#0B1229]/80 pointer-events-none z-0" />
                  
                  {loadingMessages ? (
                    <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10">
                      <div className="relative">
                        <Loader2 className="h-14 w-14 animate-spin text-[#00E5FF]/40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-[#00E5FF]/20" />
                        </div>
                      </div>
                      <p className="text-[10px] font-black text-[#00E5FF]/40 uppercase tracking-[0.3em] animate-pulse">Retrieving Manifest...</p>
                    </div>
                  ) : (messages.length === 0) ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
                       <div className="w-28 h-28 rounded-[40px] bg-[#1A2049]/80 border-2 border-[#2A3560]/60 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.05)] relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <MessageCircle className="h-12 w-12 text-[#00E5FF]/40 relative z-10 shadow-inner" />
                       </div>
                       <div className="text-center space-y-3 px-10">
                         <h3 className="text-white font-black text-xl tracking-tight">Begin Discovery</h3>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-xs mx-auto opacity-70">Initiate a formal communication channel with this scouted asset. Terms and protocols apply.</p>
                       </div>
                    </div>
                  ) : (
                    <div className="relative z-10 space-y-8 pb-4">
                      {messages.map((msg, idx) => {
                        const isOwn =
                          msg.is_sender === true ||
                          msg.is_own === true ||
                          msg.isOwn === true ||
                          (msg.sender && currentUser?.id && sameId(msg.sender, currentUser.id));
                        
                        const prevMsg = idx > 0 ? messages[idx - 1] : null;
                        const prevIsOwn = prevMsg
                          ? (prevMsg.is_sender === true || 
                             prevMsg.is_own === true || 
                             prevMsg.isOwn === true || 
                             (prevMsg.sender && currentUser?.id && sameId(prevMsg.sender, currentUser.id)))
                          : true;
                        const showAvatar = !isOwn && prevIsOwn;

                        return (
                          <div key={msg.id || idx} className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both",
                            isOwn ? "justify-end" : "justify-start"
                          )} style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}>
                            <div className={cn("flex max-w-[90%] md:max-w-[80%]", isOwn ? "flex-row-reverse" : "flex-row")}>
                              {!isOwn && (
                                <div className="w-10 shrink-0 flex items-end mb-1 mr-3">
                                  {showAvatar ? (
                                    <Avatar className="h-10 w-10 ring-2 ring-[#2A3560] border-2 border-[#1A2049] shadow-lg">
                                      <AvatarImage src={selectedConv.other_participant?.avatar || undefined} />
                                      <AvatarFallback className="text-[10px] bg-[#1A2049] font-black">AI</AvatarFallback>
                                    </Avatar>
                                  ) : <div className="w-10" />}
                                </div>
                              )}
                              <div className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
                                <div
                                  className={cn(
                                    "px-6 py-4 rounded-[28px] shadow-2xl relative transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-500/5",
                                    isOwn
                                      ? "bg-gradient-to-br from-[#9C27B0] via-[#8E24AA] to-[#7B1FA2] text-white rounded-tr-none shadow-[#9C27B0]/20 border border-white/10"
                                      : "bg-gradient-to-br from-[#242E5A] to-[#1A2049] border border-[#2A3560] text-gray-100 rounded-tl-none shadow-black/40"
                                  )}
                                >
                                  <p className="text-[14px] md:text-[16px] leading-[1.6] break-words font-semibold tracking-wide">
                                    {msg.text || msg.content || msg.message}
                                  </p>
                                </div>
                                <div className={cn("flex items-center gap-3 mt-2.5 px-2", isOwn ? "flex-row-reverse" : "flex-row")}>
                                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] opacity-80">
                                    {msg.created_at || msg.time}
                                  </p>
                                  {isOwn && (
                                    <Badge className="bg-[#00E5FF]/20 text-[#00E5FF] border-none text-[8px] h-3 px-1 py-0 pointer-events-none rounded-sm">DELIVERED</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} className="h-2" />
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
                        disabled={isSending || isCreating}
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
                      disabled={!inputValue.trim() || isSending || isCreating}
                      className={cn(
                        "h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-[24px] transition-all duration-500 relative overflow-hidden group/btn shadow-2xl",
                        !inputValue.trim() || isSending || isCreating 
                          ? "bg-[#242E5A] opacity-40 cursor-not-allowed border border-[#2A3560]" 
                          : "bg-gradient-to-br from-[#00E5FF] to-[#01BCD4] hover:shadow-[0_0_30px_#00E5FF44] active:scale-90 border-2 border-white/10"
                      )}
                    >
                      {isSending || isCreating ? (
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
              <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#0B1229] relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1A2049_0%,#0B1229_100%)] opacity-80" />
                <div className="relative z-10 flex flex-col items-center space-y-10 max-w-md text-center">
                  <div className="w-40 h-40 rounded-[50px] bg-gradient-to-tr from-[#1A2049] via-[#242E5A] to-[#2A3560] flex items-center justify-center border-2 border-[#2A3560]/60 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group transition-all duration-700 hover:scale-110 hover:-rotate-12 cursor-help">
                    <div className="absolute inset-0 bg-[#00E5FF]/5 blur-3xl rounded-full animate-pulse" />
                    <MessageSquare className="h-16 w-16 text-[#00E5FF]/20 group-hover:text-[#00E5FF]/50 transition-colors" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">Transmission Ready</h2>
                    <p className="text-sm text-gray-400 font-bold leading-relaxed px-8 opacity-60">Initialize a secure frequency by selecting a scouted talent from your database repository. All communications are logged and encrypted.</p>
                  </div>
                  <div className="flex gap-4 opacity-20 hover:opacity-100 transition-opacity">
                     <span className="w-2 h-1 bg-[#00E5FF] rounded-full" />
                     <span className="w-2 h-1 bg-[#9C27B0] rounded-full" />
                     <span className="w-2 h-1 bg-[#00E5FF] rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(26, 32, 73, 0.3);
          margin: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(42, 53, 96, 0.8);
          border-radius: 20px;
          border: 2px solid rgba(26, 32, 73, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00E5FF44;
          border-color: rgba(0, 229, 255, 0.2);
        }
        .ripple {
          position: relative;
          overflow: hidden;
        }
        .ripple:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, #00E5FF 10%, transparent 10.01%);
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform 0.5s, opacity 1s;
        }
        .ripple:active:after {
          transform: scale(0, 0);
          opacity: 0.3;
          transition: 0s;
        }
      `}</style>
    </div>
  );
};

const ScoutMessagingPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]" /></div>}>
      <MessagingContent />
    </Suspense>
  );
};

export default ScoutMessagingPage;