import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout } from "../features/auth/authSlice";

// These endpoints do NOT require authentication.
// We must NOT send the auth token to them — otherwise if the token
// happens to be expired, the backend may return 401 and trigger an
// accidental logout for a visiting user.
const PUBLIC_ENDPOINTS = new Set([
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
  "getPublicBottomSpecialAds",
  "getSubscriptionPlans",
  "createPublicCheckout",
  "getBoostPackages",
]);

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://98.81.136.120:9000/api",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;

    // Only attach token to protected endpoints
    if (
      token &&
      endpoint !== "login" &&
      !PUBLIC_ENDPOINTS.has(endpoint) &&
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
  const stateBefore = api.getState() as RootState;
  const tokenBefore = stateBefore.auth?.accessToken;

  const result = await baseQuery(args, api, extraOptions);

  const stateAfter = api.getState() as RootState;
  const tokenAfter = stateAfter.auth?.accessToken;

  // Only dispatch logout when:
  // 1. The response is 401 (Unauthorized)
  // 2. The user actually had a token when the request started (prevents public-endpoint 401s from logging out visitors)
  // 3. The token hasn't changed during the request (prevents race conditions with login)
  // 4. The endpoint that failed is NOT a public endpoint (prevents accidental logouts)
  const endpointName = typeof args === "string" ? args : (args as { url?: string }).url ?? "";
  const isPublicUrl =
    endpointName.includes("/home/") ||
    endpointName.includes("/upcoming-events/") ||
    endpointName.includes("/news/") ||
    endpointName.includes("/settings/public") ||
    endpointName.includes("/profile-boost/packages/");

  if (
    result.error &&
    result.error.status === 401 &&
    tokenBefore &&
    tokenBefore === tokenAfter &&
    !isPublicUrl
  ) {
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

