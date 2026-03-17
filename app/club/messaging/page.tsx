"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendReplyMutation,
} from "@/redux/features/chat/chatApi";
import { useGetPlayerDetailsQuery } from "@/redux/features/club/playerDiscoveryApi";
import { useAppSelector } from "@/redux/hooks";
import { ChatMessage, Conversation } from "@/types/chat/chatType";
import {
  Loader2,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Search,
  Send,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";

const MessagingContent = () => {
  const [selectedConvId, setSelectedConvId] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const savedConvId = sessionStorage.getItem("selectedConvId");
      return savedConvId ? Number(savedConvId) : null;
    }
    return null;
  });

  useEffect(() => {
    if (selectedConvId) {
      sessionStorage.setItem("selectedConvId", String(selectedConvId));
    } else {
      sessionStorage.removeItem("selectedConvId");
    }
  }, [selectedConvId]);

  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("userId");
  const targetConvId = searchParams.get("id");
  const currentUser = useAppSelector((state) => state.auth.user);

  // Helper: compare IDs regardless of type
  const sameId = useCallback(
    (a: string | number | undefined, b: string | number | undefined) =>
      a !== undefined && b !== undefined && String(a) === String(b),
    [],
  );

  const {
    data: convsData,
    isLoading: loadingConvs,
    refetch,
  } = useGetConversationsQuery(undefined, {
    pollingInterval: 5000, // Poll every 5s for new chats
  });
  const [createConversation, { isLoading: isCreating }] =
    useCreateConversationMutation();

  const { data: targetPlayerData, isLoading: loadingTargetPlayer } =
    useGetPlayerDetailsQuery(Number(targetUserId), {
      skip: !targetUserId,
    });

  const { data: messagesData, isLoading: loadingMessages } =
    useGetMessagesQuery(selectedConvId as number, {
      skip: !selectedConvId || selectedConvId < 0,
      pollingInterval: 3000, // Poll every 3s for new messages
    });

  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  const rawConversations: Conversation[] = useMemo(
    () => convsData?.conversations || [],
    [convsData],
  );

  // Logic for Virtual Conversation (when we clicked "Message" on a new player)
  const conversations = useMemo(() => {
    const list = [...rawConversations];
    if (
      targetUserId &&
      targetPlayerData &&
      !list.some((c) => sameId(c.other_participant?.id, targetUserId))
    ) {
      const virtualConv: Conversation = {
        id: -Date.now(),
        other_participant: {
          id: targetUserId,
          name: `${targetPlayerData.first_name || "Player"} ${targetPlayerData.last_name || ""}`,
          avatar: targetPlayerData.profile_image || null,
          role: "PLAYER",
        },
        unread_count: 0,
        updated_at: new Date().toISOString(),
      };
      return [virtualConv, ...list];
    }
    return list;
  }, [rawConversations, targetUserId, targetPlayerData, sameId]);

  const messages: ChatMessage[] = useMemo(() => {
    const msgs = messagesData?.messages || messagesData?.results || [];
    return [...msgs].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateA - dateB;
    });
  }, [messagesData]);

  const selectedConv = useMemo(
    () =>
      conversations.find((c) => {
        if (selectedConvId && selectedConvId < 0)
          return c.id === selectedConvId;
        return selectedConvId !== null && sameId(c.id, selectedConvId);
      }),
    [conversations, selectedConvId, sameId],
  );

  const filteredConvs = useMemo(
    () =>
      conversations.filter((conv) =>
        (conv.other_participant?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [conversations, search],
  );

  useEffect(() => {
    if (conversations.length > 0 && !initialSelectionDone.current) {
      let nextId: number | null = null;

      if (targetConvId) {
        const found = conversations.find((c) => sameId(c.id, targetConvId));
        if (found) nextId = found.id;
      } else if (targetUserId) {
        const found = conversations.find((c: Conversation) =>
          sameId(c.other_participant?.id, targetUserId),
        );
        if (found) nextId = found.id;
      }

      if (nextId === null && selectedConvId === null) {
        nextId = conversations[0].id;
      }

      if (nextId !== null) {
        setSelectedConvId(nextId);
        initialSelectionDone.current = true;
      }
    }
  }, [conversations, selectedConvId, targetConvId, targetUserId, sameId]);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedConvId) return;

    try {
      if (selectedConvId && selectedConvId < 0 && targetUserId) {
        const response = await createConversation({
          receiver_id: targetUserId,
          message: inputValue.trim(),
        }).unwrap();
        const newConvId = response.conversationId;
        if (newConvId) {
          setSelectedConvId(newConvId);
        }
        refetch();
      } else {
        await sendReply({
          conversation_id: selectedConvId,
          message: inputValue.trim(),
        }).unwrap();
      }
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message.");
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
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden relative group/page">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#9C27B0]/5 rounded-full blur-[120px] pointer-events-none" />

      <h1 className="text-3xl font-black mb-6 px-2 tracking-tight flex items-center gap-3">
        <span className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Messaging Hub
        </span>
        <div className="h-1 flex-1 bg-gradient-to-r from-[#2A3560] to-transparent rounded-full opacity-20" />
      </h1>

      <div className="flex flex-1 overflow-hidden bg-[#1A2049]/40 backdrop-blur-xl rounded-[32px] border border-[#2A3560]/50 shadow-2xl relative">
        {/* Sidebar */}
        <div
          className={cn(
            "flex flex-col border-r border-[#2A3560]/40 bg-[#1A2049]/60 shrink-0 transition-all",
            "w-full md:w-80 lg:w-96",
            selectedConvId && "hidden md:flex",
          )}
        >
          <div className="p-6">
            <div className="relative group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00E5FF]/40 group-focus-within/search:text-[#00E5FF]" />
              <Input
                placeholder="Search conversations..."
                className="pl-11 bg-[#0B1229]/60 border-[#2A3560] text-white placeholder:text-gray-500 rounded-2xl h-12 focus:border-[#00E5FF]/50 border-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            {loadingConvs ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#00E5FF]" />
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="px-8 py-12 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#242E5A] text-gray-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase">
                  No Conversations
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConvs.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 cursor-pointer transition-all rounded-2xl border border-transparent",
                      selectedConvId === conv.id
                        ? "bg-gradient-to-r from-[#242E5A] to-[#1A2049] shadow-lg border-[#00E5FF]/20"
                        : "hover:bg-[#242E5A]/40",
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar
                        className={cn(
                          "h-14 w-14 ring-2",
                          selectedConvId === conv.id
                            ? "ring-[#00E5FF]/40"
                            : "ring-transparent",
                        )}
                      >
                        <AvatarImage
                          src={conv.other_participant?.avatar || undefined}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-[#242E5A] text-white font-black">
                          {(conv.other_participant?.name || "P")[0]}
                        </AvatarFallback>
                      </Avatar>
                      {conv.id === -1 && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-purple-500 rounded-full border-2 border-[#1A2049] animate-pulse" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p
                          className={cn(
                            "font-bold truncate text-[15px]",
                            selectedConvId === conv.id
                              ? "text-white"
                              : "text-gray-300",
                          )}
                        >
                          {conv.other_participant?.name}
                        </p>
                        <span className="text-[9px] text-gray-500 font-black">
                          {conv.id === -1
                            ? "NEW"
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
                      <p className="text-xs text-gray-400 truncate opacity-70">
                        {conv.id === -1
                          ? "Start a new conversation"
                          : conv.last_message?.content || "Message open"}
                      </p>
                    </div>

                    {conv.unread_count > 0 && (
                      <Badge className="bg-[#00E5FF] text-[#1A2049] font-black text-[10px] rounded-full">
                        {conv.unread_count}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-[#1A2049]/40 to-[#0B1229]/40 relative">
          {selectedConv ? (
            <>
              <div className="shrink-0 p-5 md:p-6 border-b border-[#2A3560]/40 flex items-center justify-between bg-[#1A2049]/80 backdrop-blur-2xl">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-[#00E5FF]/40">
                    <AvatarImage
                      src={selectedConv.other_participant?.avatar || undefined}
                      className="object-cover"
                    />
                    <AvatarFallback className="font-black">
                      {(selectedConv.other_participant?.name || "P")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-black text-white text-lg">
                      {selectedConv.other_participant?.name}
                    </h2>
                    <div className="flex items-center gap-2 text-[10px] text-[#00E5FF]/80 font-black uppercase tracking-widest">
                      <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
                      {selectedConv.id === -1
                        ? "New Connection"
                        : "Active Connection"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden text-gray-400 p-2"
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1 custom-scrollbar bg-[#0B1229]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-40">
                    <MessageCircle size={64} className="mb-4" />
                    <h3 className="text-xl font-bold text-white">
                      Start the conversation
                    </h3>
                    <p className="text-sm">
                      Type your message below and press enter.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto space-y-1 pb-4">
                    {messages.map((msg, idx) => {
                      const isOwn =
                        msg.is_sender ||
                        msg.is_own ||
                        msg.sender === currentUser?.id ||
                        sameId(msg.sender, currentUser?.id);
                      return (
                        <div
                          key={msg.id || idx}
                          className={cn(
                            "flex items-end gap-2",
                            isOwn ? "justify-end" : "justify-start",
                          )}
                        >
                          {!isOwn && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  selectedConv.other_participant?.avatar ||
                                  undefined
                                }
                              />
                              <AvatarFallback>
                                {(selectedConv.other_participant?.name ||
                                  "U")[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-[70%]",
                              isOwn ? "text-right" : "text-left",
                            )}
                          >
                            <div
                              className={cn(
                                "px-4 py-2 rounded-lg",
                                isOwn
                                  ? "bg-blue-600 text-white rounded-br-none"
                                  : "bg-gray-700 text-gray-200 rounded-bl-none",
                              )}
                            >
                              <p className="text-sm">
                                {msg.content || msg.text || msg.message}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-2">
                              {new Date(
                                msg.created_at || "",
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} className="h-4" />
                  </div>
                )}
              </div>

              <div className="p-5 md:p-8 bg-[#1A2049]/95 backdrop-blur-2xl border-t border-[#2A3560]/40">
                <div className="max-w-5xl mx-auto flex items-center gap-3 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#0B1229]/80 border-[#2A3560] text-white h-14 md:h-16 px-6 rounded-2xl focus:ring-4 focus:ring-[#00E5FF]/5"
                    disabled={isSending || isCreating}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isSending || isCreating}
                    className="h-14 w-14 md:h-16 md:w-16 bg-[#00E5FF] text-[#1A2049] rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSending || isCreating ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send size={24} />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#00E5FF]/20 gap-4">
              <MessageSquare size={80} />
              <p className="font-black uppercase tracking-widest text-center opacity-40">
                Select a contact to start
                <br />
                secure transmission
              </p>
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
          background: #2a3560;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

const ClubMessagingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-[#00E5FF]" />
        </div>
      }
    >
      <MessagingContent />
    </Suspense>
  );
};

export default ClubMessagingPage;
