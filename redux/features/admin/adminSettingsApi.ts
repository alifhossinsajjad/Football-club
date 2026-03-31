import { baseApi } from "@/redux/api/baseApi";

// ─── Types 

export interface BrandColors {
  primaryCyan: string;
  backgroundCard: string;
  backgroundDark: string;
  primaryMagenta: string;
}

export interface GeneralSettings {
  platformName: string;
  tagline: string;
  platformLogo: string | File;
  favicon: string | File;
  brandColors: BrandColors;
}

export interface LocalizationSettings {
  defaultLanguage: string;
  enabledLanguages: string[];
}

export interface UserManagementSettings {
  requireEmailVerification: boolean;
  adminApprovalForClubs: boolean;
  adminApprovalForScouts: boolean;
  playerRegistration: {
    requireGuardianConsent: boolean;
    minimumAge: number;
  };
  userRoles: {
    players: { subscription: string; status: string };
    clubs: { subscription: string; status: string };
    scouts: { subscription: string; status: string };
  };
  userPermissions: {
    allowClubsToContactPlayers: boolean;
    allowScoutsToContactPlayers: boolean;
    enableMessagingSystem: boolean;
  };
}

export interface MonetizationSettings {
  profileBoostPricing: {
    eventPrice: number;
    playerPrice: number;
    autoRenewBoosts: boolean;
    requireAdminApprovalForBoosts: boolean;
  };
  featuredListings: {
    boostDurationForPlayers: number;
    maxFeaturedEventsPerPage: number;
    showBoostBadgeOnProfiles: boolean;
    maxFeaturedPlayersPerPage: number;
  };
  advertising: {
    enableAdBannerSystem: boolean;
  };
  revenueTracking: {
    revenueReportEmail: string;
    trackConversionRates: boolean;
    enableRevenueAnalytics: boolean;
    sendMonthlyRevenueReports: boolean;
  };
}

export interface MonetizationSettingsResponse {
  success: boolean;
  data: MonetizationSettings;
}

export interface NotificationSettings {
  newUserRegistration: boolean;
  eventPublishedNotification: boolean;
  profileApprovalNotification: boolean;
  subscriptionPurchaseRenewal: boolean;
}

export interface NotificationSettingsResponse {
  notifications: NotificationSettings;
}

export interface UpdateSettingsResponse {
  message: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const adminSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralSettings: builder.query<GeneralSettings, void>({
      query: () => "/admin-dashboard/settings/general/",
      providesTags: ["Dashboard"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          // Example: Setting up Server-Sent Events for real-time config updates
          const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
          if (!apiUrl) return;

          const eventSource = new EventSource(`${apiUrl}/admin-dashboard/settings/general/stream`);

          eventSource.onmessage = (event) => {
            try {
              const newConfig = JSON.parse(event.data);
              updateCachedData((draft) => {
                Object.assign(draft, newConfig);
              });
            } catch (err) {
              console.error("Failed to parse config update", err);
            }
          };

          await cacheEntryRemoved;
          eventSource.close();
        } catch {
          // no-op
        }
      },
    }),
    updateGeneralSettings: builder.mutation<UpdateSettingsResponse, FormData>({
      query: (payload) => ({
        url: "/admin-dashboard/settings/general/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getLocalizationSettings: builder.query<LocalizationSettings, void>({
      query: () => "/admin-dashboard/settings/localization/",
      providesTags: ["Dashboard"],
    }),
    updateLocalizationSettings: builder.mutation<UpdateSettingsResponse, LocalizationSettings>({
      query: (payload) => ({
        url: "/admin-dashboard/settings/localization/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getUserManagementSettings: builder.query<UserManagementSettings, void>({
      query: () => "/admin-dashboard/settings/user-management/",
      providesTags: ["Dashboard"],
    }),
    updateUserManagementSettings: builder.mutation<UpdateSettingsResponse, UserManagementSettings>({
      query: (payload) => ({
        url: "/admin-dashboard/settings/user-management/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getMonetizationSettings: builder.query<MonetizationSettings, void>({
      query: () => "/admin-dashboard/settings/monetization/",
      transformResponse: (response: any) => response.data || response,
      providesTags: ["Dashboard"],
    }),
    updateMonetizationSettings: builder.mutation<UpdateSettingsResponse, MonetizationSettings>({
      query: (payload) => ({
        url: "/admin-dashboard/settings/monetization/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => "/admin-dashboard/settings/notifications/",
      transformResponse: (response: NotificationSettingsResponse) => response.notifications,
      providesTags: ["Dashboard"],
    }),
    updateNotificationSettings: builder.mutation<UpdateSettingsResponse, { notifications: NotificationSettings }>({
      query: (payload) => ({
        url: "/admin-dashboard/settings/notifications/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useGetLocalizationSettingsQuery,
  useUpdateLocalizationSettingsMutation,
  useGetUserManagementSettingsQuery,
  useUpdateUserManagementSettingsMutation,
  useGetMonetizationSettingsQuery,
  useUpdateMonetizationSettingsMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = adminSettingsApi;
