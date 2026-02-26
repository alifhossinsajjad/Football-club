import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  colors: {
    primaryCyan: string;
    primaryMagenta: string; // added for gradients/borders
    primaryGreen: string;
  };
  platformName: string;
}

const initialState: ThemeState = {
  colors: {
    primaryCyan: "#00E5FF",
    primaryMagenta: "#B026FF", // magenta/purple used in designs
    primaryGreen: "#084559",
  },
  platformName: "NextGen Pros",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Partial<ThemeState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
