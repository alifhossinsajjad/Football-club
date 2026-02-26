import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// List of endpoints that require authentication
const protectedEndpoints = [
  "protectedEndpoint1",
  "protectedEndpoint2",
  // Add all endpoints that need token here
];

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Only add Authorization if this endpoint requires it
      if (protectedEndpoints.includes(endpoint)) {
        const stateToken = (getState() as RootState).auth?.accessToken;
        const storageToken =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;

        let token = stateToken || storageToken;
        if (token) {
          token = token.replace(/"/g, ""); // remove accidental quotes
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});