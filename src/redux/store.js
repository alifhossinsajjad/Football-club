import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './fatures/slice/themeSlice'


export const store = configureStore({
  reducer: {
    theme: themeReducer
  }
})