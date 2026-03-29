export interface ChatUser {
  id: string | number;
  name: string;
  profile_image?: string | null;
  avatar?: string | null; // Legacy/Fallback field
  role?: string;
  email?: string;
}

export interface LastMessage {
  id: number;
  content: string;
  sender: number | string;
  sender_name: string;
  sender_role: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: number;
  last_message?: LastMessage;
  other_participant: ChatUser;
  unread_count: number;
  updated_at: string;
  // Fallbacks for transition
  name?: string;
  user?: ChatUser;
  avatar?: string | null;
  last_message_text?: string;
  time?: string;
}

export interface ChatMessage {
  id: string | number;
  messageId?: string | number;   // returned by create-conversation API
  conversationId?: number;       // returned by create-conversation API
  content?: string;
  text?: string;
  message?: string;
  senderId?: string | number;
  receiverId?: string | number;
  is_sender?: boolean;
  is_own?: boolean;
  isOwn?: boolean;
  sender?: number | string;
  sender_name?: string;
  timestamp?: string;
  created_at?: string;
  time?: string;
}

export interface ChatResponse {
  conversations: Conversation[];
}

export interface MessageResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ChatMessage[];
  messages?: ChatMessage[];
  conversationId?: number;
}
