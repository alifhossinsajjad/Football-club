/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendReplyMutation,
} from "@/redux/features/chat/chatApi";
import { useGetPlayerByIdQuery } from "@/redux/features/scout/playerDiscoverApi";
import { useAppSelector } from "@/redux/hooks";
import {
  Loader2,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Search,
  Send,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ChatMessage, Conversation } from "../../../types/chat/chatType";

const MessagingContent = () => {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get("userId");
  const urlPlayerId = searchParams.get("playerId");
  const targetConvId = searchParams.get("id");

  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(urlUserId);
  const [playerId, setPlayerId] = useState<string | null>(urlPlayerId);

  // Load persistence and URL state
  useEffect(() => {
    const saved = localStorage.getItem("scout_lastMessagingState");
    const parsed = saved ? JSON.parse(saved) : null;

    if (urlUserId || urlPlayerId || targetConvId) {
      if (urlUserId) setTargetUserId(urlUserId);
      if (urlPlayerId) setPlayerId(urlPlayerId);
      if (targetConvId) setSelectedConvId(Number(targetConvId));
    } else if (parsed) {
      if (parsed.selectedConvId) setSelectedConvId(parsed.selectedConvId);
      if (parsed.targetUserId) setTargetUserId(parsed.targetUserId);
      if (parsed.playerId) setPlayerId(parsed.playerId);
    }
  }, [urlUserId, urlPlayerId, targetConvId]);

  // Save persistence
  useEffect(() => {
    if (selectedConvId || targetUserId || playerId) {
      localStorage.setItem(
        "scout_lastMessagingState",
        JSON.stringify({
          selectedConvId,
          targetUserId,
          playerId,
        }),
      );
    }
  }, [selectedConvId, targetUserId, playerId]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  // Get logged-in user's numeric ID to determine message ownership
  const currentUser = useAppSelector((state) => state.auth.user);

  // Helper: compare IDs regardless of type (string "USR-00020" or number)
  const sameId = React.useCallback(
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

  const {
    data: convsData,
    isLoading: loadingConvs,
    refetch,
  } = useGetConversationsQuery();
  const [createConversation, { isLoading: isCreating }] =
    useCreateConversationMutation();

  const { data: targetPlayerData, isLoading: loadingTargetPlayer } =
    useGetPlayerByIdQuery(
      (() => {
        const pid = Number(playerId);
        if (!isNaN(pid)) return pid;
        const uid = Number(String(targetUserId).replace("USR-", ""));
        if (!isNaN(uid)) return uid;
        return 0; // Fallback
      })(),
      {
        skip: !playerId && !targetUserId,
      },
    );

  console.log("scout page ", targetPlayerData);

  const { data: messagesData, isLoading: loadingMessages } =
    useGetMessagesQuery(selectedConvId, {
      // Skip when no conversation selected OR when it's a virtual conversation (id < 0)
      skip: !selectedConvId || selectedConvId < 0,
    });
  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  const rawConversations: Conversation[] = convsData?.conversations || [];

  // Logic for Virtual Conversation
  const conversations = React.useMemo(() => {
    const list = [...rawConversations];
    // Only add virtual conversation if no existing conversation with that participant
    if (
      targetUserId &&
      targetPlayerData &&
      !list.some((c) => sameId(c.other_participant?.id, targetUserId))
    ) {
      const virtualConv: Conversation = {
        id: -Date.now(), // Unique negative ID to avoid collisions
        other_participant: {
          id: targetUserId as string,
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
      if (selectedConvId && selectedConvId < 0) return c.id === selectedConvId;
      return selectedConvId !== null && sameId(c.id, selectedConvId);
    });
  }, [conversations, selectedConvId, sameId]);

  const filteredConvs = conversations.filter((conv) =>
    (conv.other_participant?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (conversations.length > 0 && !initialSelectionDone.current) {
      let nextId: number | string | null = null;
      if (targetConvId) {
        // Fix 403: Only select if the user is actually a participant
        const convExists = conversations.some((c) =>
          sameId(c.id, targetConvId),
        );
        if (convExists) {
          nextId = isNaN(Number(targetConvId))
            ? targetConvId
            : Number(targetConvId);
        } else {
          // Fallback to first available if illegal ID in URL
          nextId = conversations[0].id;
        }
      } else if (targetUserId) {
        const found = conversations.find((c: Conversation) =>
          sameId(c.other_participant?.id, targetUserId),
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
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      };
      // Short delay to ensure DOM has rendered new batch
      const timer = setTimeout(scroll, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, loadingMessages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    try {
      if (selectedConvId && selectedConvId < 0 && targetUserId) {
        // Create new conversation
        const response = await createConversation({
          receiver_id: targetUserId,
          message: inputValue.trim(),
        }).unwrap();
        const newConvId = response.conversationId;
        if (newConvId) {
          setSelectedConvId(newConvId);
        }
        refetch();
      } else if (selectedConvId !== null && selectedConvId >= 0) {
        // Reply to existing - IMPORTANT: Include receiver_id
        const receiverId = selectedConv?.other_participant?.id;
        if (!receiverId) {
          toast.error("Cannot identify message recipient");
          return;
        }

        await sendReply({
          conversation_id: selectedConvId,
          message: inputValue.trim(),
          receiver_id: receiverId, // Add this!
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
    <div className="p-2 md:p-4 lg:p-6 bg-[#080D28] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
        <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Messaging
        </h1>

        <div className="flex-1 flex bg-[#1A2049] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A3560]/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm relative min-h-0">
          {/* Decorative Glow Elements */}
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#9C27B0]/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Left Sidebar - Chat List */}
          <div
            className={cn(
              "flex flex-col border-r border-white/5 bg-[#12143A] backdrop-blur-md transition-all duration-300 relative z-10 shrink-0",
              "w-full md:w-85 lg:w-[400px]",
              selectedConvId && "hidden md:flex",
            )}
          >
            <div className="p-5 border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Messages
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input
                  placeholder="Search messages..."
                  className="pl-11 bg-[#080D28]/50 border-white/10 text-white placeholder:text-white/20 focus:border-[#00E5FF]/50 rounded-xl h-12 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {loadingConvs ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]/60" />
                  <p className="text-[10px] text-[#00E5FF]/40 font-bold uppercase tracking-[0.2em]">
                    Syncing Feed...
                  </p>
                </div>
              ) : filteredConvs.length === 0 && !loadingTargetPlayer ? (
                <div className="flex flex-col items-center justify-center p-10 h-64 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-[#242E5A]/40 flex items-center justify-center mb-4 border border-[#2A3560]/30 shadow-inner">
                    <MessageCircle className="h-8 w-8 text-[#00E5FF]/20" />
                  </div>
                  <p className="text-sm text-gray-400 font-bold opacity-60">
                    No transmission found
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {loadingTargetPlayer &&
                    !filteredConvs.some((c) => c.id === -1) && (
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
                        "flex items-center gap-4 px-4 py-4 cursor-pointer transition-all rounded-xl group relative overflow-hidden mb-1",
                        selectedConvId === conv.id
                          ? "bg-gradient-to-r from-[#242E5A] to-[#1A2049]"
                          : "hover:bg-white/5",
                      )}
                    >
                      <div className="relative shrink-0">
                        <Avatar
                          className={cn(
                            "h-14 w-14 transition-all duration-300",
                            selectedConvId === conv.id
                              ? "ring-2 ring-purple-500"
                              : "ring-0",
                          )}
                        >
                          <AvatarImage
                            src={conv.other_participant?.avatar || undefined}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-[#1A2049] text-white font-bold text-xl">
                            {(conv.other_participant?.name || "U")
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {conv.unread_count > 0 && (
                          <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#9C27B0] rounded-full text-[10px] font-bold text-white border-2 border-[#12143A]">
                            {conv.unread_count}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p
                            className={cn(
                              "font-bold truncate text-[16px]",
                              selectedConvId === conv.id
                                ? "text-white"
                                : "text-white/80",
                            )}
                          >
                            {conv.other_participant?.name}
                          </p>
                          <span className="text-[11px] text-white/40 whitespace-nowrap">
                            {conv.id < 0
                              ? "just now"
                              : conv.last_message?.created_at
                                ? new Date(
                                    conv.last_message.created_at,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                          </span>
                        </div>
                        <p className="text-sm text-white/50 truncate">
                          {conv.id < 0
                            ? "Start a conversation..."
                            : conv.last_message?.content || ""}
                        </p>
                        <div className="mt-1 flex gap-1">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-900/40 text-cyan-400 text-[10px] font-bold uppercase">
                            {conv.other_participant?.role?.toLowerCase() ||
                              "user"}
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
          <div
            className={cn(
              "flex-1 flex flex-col bg-[#0B0D28] relative z-0 h-full overflow-hidden min-h-0",
              !selectedConvId && "hidden md:flex",
            )}
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="shrink-0 p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-[#0B0D28] backdrop-blur-2xl sticky top-0 z-30">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedConvId(null)}
                      className="md:hidden p-2 text-white/70"
                    >
                      <MoreVertical className="h-5 w-5 rotate-90" />
                    </button>
                    <div className="relative">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-white/10 transition-transform">
                        <AvatarImage
                          src={
                            selectedConv.other_participant?.avatar || undefined
                          }
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-[#1A2049] font-bold text-lg">
                          {(selectedConv.other_participant?.name ||
                            "U")[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-[#00E5FF] border-2 border-[#12143A] rounded-full shadow-[0_0_8px_#00E5FF]" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-lg tracking-tight">
                        {selectedConv.other_participant?.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-[#00E5FF]/80 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
                        Active now
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      title="Options"
                      className="p-3 rounded-2xl bg-[#242E5A]/80 border border-[#2A3560]/50 text-[#00E5FF]/60 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar scroll-smooth relative min-h-0 bg-[#080D28]">
                  {!loadingMessages && messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
                      <div className="w-24 h-24 rounded-[32px] bg-[#1A2049]/80 border-2 border-[#2A3560]/60 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.05)]">
                        <MessageCircle className="h-10 w-10 text-[#00E5FF]/40 relative z-10" />
                      </div>
                      <div className="text-center space-y-2 px-10">
                        <h3 className="text-white font-bold text-lg tracking-tight">
                          Zero Transmissions
                        </h3>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto opacity-70">
                          Initiate a secure channel to begin data exchange with
                          this asset.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 space-y-1 pb-4">
                      {messages.map((msg, idx) => {
                        const isOwn =
                          msg.is_sender === true ||
                          msg.is_own === true ||
                          msg.isOwn === true ||
                          (msg.sender &&
                            currentUser?.id &&
                            sameId(msg.sender, currentUser.id));

                        const nextMsg =
                          idx < messages.length - 1 ? messages[idx + 1] : null;
                        const prevMsg = idx > 0 ? messages[idx - 1] : null;

                        const nextIsOwn = nextMsg
                          ? nextMsg.is_sender === true ||
                            nextMsg.is_own === true ||
                            nextMsg.isOwn === true ||
                            (nextMsg.sender &&
                              currentUser?.id &&
                              sameId(nextMsg.sender, currentUser.id))
                          : null;

                        const prevIsOwn = prevMsg
                          ? prevMsg.is_sender === true ||
                            prevMsg.is_own === true ||
                            prevMsg.isOwn === true ||
                            (prevMsg.sender &&
                              currentUser?.id &&
                              sameId(prevMsg.sender, currentUser.id))
                          : null;

                        const isFirstInGroup = prevIsOwn !== isOwn;
                        const isLastInGroup = nextIsOwn !== isOwn;
                        const showAvatar = !isOwn && isLastInGroup;

                        return (
                          <div
                            key={msg.id || idx}
                            className={cn(
                              "flex flex-col gap-1",
                              isOwn ? "items-end" : "items-start",
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[80%] px-4 py-3 text-[15px] leading-relaxed",
                                isOwn
                                  ? "bg-[#9C27B0] text-white rounded-[18px] rounded-tr-none"
                                  : "bg-[#1E2554] text-white/90 rounded-[18px] rounded-tl-none",
                              )}
                            >
                              <p>{msg.text || msg.content || msg.message}</p>
                            </div>
                            <p className="text-[10px] text-white/20 mt-1 font-medium">
                              {new Date(
                                msg.created_at || "",
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        );
                      })}

                      {loadingMessages && (
                        <div className="flex justify-center p-4">
                          <Loader2 className="h-6 w-6 animate-spin text-[#00E5FF]/40" />
                        </div>
                      )}
                      <div ref={messagesEndRef} className="h-2" />
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
                        disabled={isSending || isCreating}
                      />
                    </div>

                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isSending || isCreating}
                      className={cn(
                        "h-12 w-12 flex items-center justify-center rounded-xl transition-all relative overflow-hidden group/btn",
                        !inputValue.trim() || isSending || isCreating
                          ? "bg-white/5 text-white/20"
                          : "bg-[#00E5FF] text-[#080D28] hover:scale-105 active:scale-95",
                      )}
                    >
                      {isSending || isCreating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5 fill-current" />
                      )}
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
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                      Transmission Ready
                    </h2>
                    <p className="text-sm text-gray-400 font-bold leading-relaxed px-8 opacity-60">
                      Initialize a secure frequency by selecting a scouted
                      talent from your database repository. All communications
                      are logged and encrypted.
                    </p>
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
          background: #00e5ff44;
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
          background-image: radial-gradient(
            circle,
            #00e5ff 10%,
            transparent 10.01%
          );
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition:
            transform 0.5s,
            opacity 1s;
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
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]" />
        </div>
      }
    >
      <MessagingContent />
    </Suspense>
  );
};

export default ScoutMessagingPage;
