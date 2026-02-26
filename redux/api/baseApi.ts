import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
     prepareHeaders: (headers, { getState }) => {
      const stateToken = (getState() as RootState).auth?.accessToken;

      const storageToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      const token = stateToken || storageToken;

      if (token && typeof token === "string") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("ngrok-skip-browser-warning", "true");

      return headers;
    },
 
  }),
  endpoints: () => ({}),
  tagTypes: [],
});