
export interface AuthState {
  user: any;
  accessToken: string | null; // <-- explicitly allow string or null
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
};