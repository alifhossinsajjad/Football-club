import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}


const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    // SSR — no localStorage available
    return { user: null, accessToken: null, refreshToken: null };
  }

  return {
    user: null, // user object is not persisted (too large / sensitive)
    accessToken: localStorage.getItem("accessToken") ?? null,
    refreshToken: localStorage.getItem("refreshToken") ?? null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    updateUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profile_image = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;