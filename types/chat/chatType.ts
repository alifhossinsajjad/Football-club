export interface ChatUser {
  id: number;
  name: string;
  avatar?: string | null;
}

export interface Conversation {
  id: number;
  name?: string;
  user?: ChatUser;
  avatar?: string | null;
  active?: boolean;
  last_message?: string;
  message?: string;
  last_message_time?: string;
  time?: string;
  unread_count: number;
}

export interface ChatMessage {
  id: number;
  text?: string;
  content?: string;
  is_sender?: boolean;
  isOwn?: boolean;
  is_own?: boolean;
  created_at?: string;
  time?: string;
}

export interface ChatResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Conversation[];
}

export interface MessageResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ChatMessage[];
}
