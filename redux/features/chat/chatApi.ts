import { baseApi } from "../../api/baseApi";
import {
  Conversation,
  ChatMessage,
  ChatResponse,
  MessageResponse,
} from "@/types/chat/chatType";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<ChatResponse, void>({
      query: () => "/chats/messages/conversations/",
      providesTags: ["Chat"],
    }),
    getMessages: builder.query<MessageResponse, number | string | null>({
      query: (id) => `/chats/messages/${id}/`,
      providesTags: ["Chat"],
    }),
    createConversation: builder.mutation<
      ChatMessage,
      { receiver_id: string | number; message: string }
    >({
      query: (data) => ({
        url: "/chats/messages/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    sendReply: builder.mutation<
      ChatMessage,
      {
        conversation_id: number | string;
        message: string;
        receiver_id?: string | number; // Make sure this is included
      }
    >({
      query: (data) => ({
        url: "/chats/messages/reply/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useCreateConversationMutation,
  useSendReplyMutation,
} = chatApi;
