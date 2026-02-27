export type UserRole = "PLAYER" | "ADMIN" | "COACH";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  player_id: number;
  first_name: string;
  last_name: string;
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