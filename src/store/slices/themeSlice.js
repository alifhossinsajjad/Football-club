import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformName: "NextGen Pros",
  tagline:
    "Next-generation digital platform for youth football talent discovery",
  colors: {
    primaryCyan: "#04B5A3",
    primaryMagenta: "#9C27B0",
    backgroundDark: "#0B0D2C",
    backgroundCard: "#12143A",
    neonAccent: "#14F1D9",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updatePlatformName: (state, action) => {
      state.platformName = action.payload;
    },
    updateTagline: (state, action) => {
      state.tagline = action.payload;
    },
    updateColor: (state, action) => {
      const { colorKey, value } = action.payload;
      state.colors[colorKey] = value;
    },
    resetTheme: () => initialState,
  },
});

export const { updatePlatformName, updateTagline, updateColor, resetTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
