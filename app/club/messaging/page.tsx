/* eslint-disable react-hooks/purity */
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
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get("userId");
  const urlPlayerId = searchParams.get("playerId");
  const targetConvId = searchParams.get("id");

  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(urlUserId);
  const [playerId, setPlayerId] = useState<string | null>(urlPlayerId);

  // Load persistence and URL state
  useEffect(() => {
    const saved = localStorage.getItem("club_lastMessagingState");
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
      localStorage.setItem("club_lastMessagingState", JSON.stringify({
        selectedConvId,
        targetUserId,
        playerId
      }));
    }
  }, [selectedConvId, targetUserId, playerId]);

  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSelectionDone = useRef(false);
  const currentUser = useAppSelector((state) => state.auth.user);

  // Helper: compare IDs regardless of type
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
    useGetPlayerDetailsQuery(
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

  const { data: messagesData, isLoading: loadingMessages } =
    useGetMessagesQuery(selectedConvId as number, {
      skip: !selectedConvId || selectedConvId < 0,
      pollingInterval: 3000, // Poll every 3s for new messages
    });

  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  const rawConversations: Conversation[] = useMemo(() => {
    if (Array.isArray(convsData)) return convsData;
    if (convsData?.conversations) return convsData.conversations;
    if ((convsData as any)?.results) return (convsData as any).results;
    return [];
  }, [convsData]);

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
    let msgs: ChatMessage[] = [];
    if (Array.isArray(messagesData)) msgs = messagesData;
    else if (messagesData?.messages) msgs = messagesData.messages;
    else if ((messagesData as any)?.results) msgs = (messagesData as any).results;
    
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
    } else if (selectedConvId !== null && selectedConvId >= 0) {
      // Get receiver ID from selected conversation
      const receiverId = selectedConv?.other_participant?.id;
      if (!receiverId) {
        toast.error("Cannot identify recipient");
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
    <div className="flex flex-col h-[calc(100vh-100px)] w-full overflow-hidden relative bg-[#080D28] p-4 md:p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent px-2">
        Messaging
      </h1>

      <div className="flex flex-1 overflow-hidden bg-[#12143A] rounded-[24px] border border-white/5 shadow-2xl relative">
        {/* Sidebar */}
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input
                placeholder="Search messages..."
                className="pl-11 bg-[#080D28]/50 border-white/5 text-white placeholder:text-white/20 rounded-xl h-11 focus:border-purple-500/50 transition-all"
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
                      "flex items-center gap-4 px-4 py-4 cursor-pointer transition-all rounded-xl relative",
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
                        <AvatarFallback className="bg-[#1A2049] text-white font-bold">
                          {(conv.other_participant?.name || "P")[0]}
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
                          : conv.last_message?.content || "Message open"}
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

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0B0D28] relative">
          {selectedConv ? (
            <>
              <div className="shrink-0 p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-[#0B0D28]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-white/10">
                      <AvatarImage
                        src={selectedConv.other_participant?.avatar || undefined}
                        className="object-cover"
                      />
                      <AvatarFallback className="font-bold bg-[#1A2049]">
                        {(selectedConv.other_participant?.name || "P")[0]}
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
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden text-white/50 p-2"
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar bg-[#080D28]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-20">
                    <MessageCircle size={64} className="mb-4" />
                    <h3 className="text-xl font-bold text-white">
                      Start the conversation
                    </h3>
                  </div>
                ) : (
                  <div className="mx-auto space-y-6 pb-4">
                    {messages.map((msg, idx) => {
                      const isOwn =
                        msg.is_sender === true ||
                        msg.is_own === true ||
                        (msg as any).isOwn === true ||
                        (msg.sender && currentUser?.id && sameId(msg.sender, currentUser.id));
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
                            <p>{msg.content || msg.text || msg.message}</p>
                          </div>
                          <p className="text-[10px] text-white/20 mt-1 font-medium">
                            {new Date(
                              msg.created_at || "",
                            ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} className="h-4" />
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 bg-[#080D28] border-t border-white/5">
                <div className="max-w-5xl mx-auto flex items-center gap-4 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#12143A]/50 border-white/5 text-white h-12 px-6 rounded-xl focus:border-purple-500 transition-all placeholder:text-white/20"
                    disabled={isSending || isCreating}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isSending || isCreating}
                    className={cn(
                        "h-12 w-12 flex items-center justify-center rounded-xl transition-all",
                        !inputValue.trim() || isSending || isCreating
                          ? "bg-white/5 text-white/20"
                          : "bg-[#00E5FF] text-[#080D28] hover:scale-105 active:scale-95",
                    )}
                  >
                    {isSending || isCreating ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <Send size={20} className="fill-current" />
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
