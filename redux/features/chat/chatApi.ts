import { baseApi } from "../../api/baseApi";
import { Conversation, ChatMessage, ChatResponse, MessageResponse } from "@/types/chat/chatType";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[] | ChatResponse, void>({
      query: () => "/chats/messages/conversations/",
      providesTags: ["Chat"],
    }),
    getMessages: builder.query<ChatMessage[] | MessageResponse, number | null>({
      query: (id) => `/chats/messages/${id}/`,
      providesTags: ["Chat"],
    }),
    sendMessage: builder.mutation<ChatMessage, { conversation: number; text: string }>({
      query: (data) => ({
        url: "/chats/messages/",
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
  useSendMessageMutation,
} = chatApi;
