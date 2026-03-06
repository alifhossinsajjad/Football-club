export type UserRole =
  | "PLAYER"
  | "ADMIN"
  | "SCOUT_AGENT"
  | "CLUB_ACADEMY";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  player_id: number;
  first_name: string;
  last_name: string;
  profile_image?: string | null;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface PlayerRegisterResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}