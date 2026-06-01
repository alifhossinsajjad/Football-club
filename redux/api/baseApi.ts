import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;

    const publicEndpoints = new Set([
      "getHeroData",
      "getUpcomingEvents",
      "getLatestNews",
      "getNewsById",
      "getPublicSettings",
      "getFeaturedClubs",
      "getAllAds",
      "getAllFaqs",
      "getFeaturedPlayers",
      "getPublicSpecialAds",
      "getPublicBottomSpecialAds"
    ]);

    if (
      token && 
      endpoint !== "login" && 
      !publicEndpoints.has(endpoint) && 
      !headers.has("Authorization")
    ) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const hadToken = !!state.auth?.accessToken;

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401 && hadToken) {
    // Only clear credentials if the user actually had a token (session expired).
    // This prevents 401s from public API endpoints from logging out anonymous
    // visitors or clearing valid sessions.
    // NOTE: No redirect here — ProtectedRoute handles redirecting to /login
    // for protected pages. The public landing page must stay accessible.
    api.dispatch(logout());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Profile",
    "Settings",
    "Dashboard",
    "Discovery",
    "Events",
    "Registrations",
    "Clubs",
    "ScoutProfile",
    "Users",
    "Subscription",
    "PaymentHistory",
    "ClubProfile",
    "ClubSettings",
    "ClubPrivacy",
    "ClubNotifications",
    "PlayerDiscovery",
    "Chat",
    "Notification",
    "Promo",
    "Config",
    "Ads",
    "Faq",
    "Testimonials",
    "BoostPackages"
  ],
  endpoints: () => ({}),
});

