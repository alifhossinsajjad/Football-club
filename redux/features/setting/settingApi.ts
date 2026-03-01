import { baseApi } from "@/redux/api/baseApi";
import { AccountSettings, AllSettings, ChangePasswordPayload, NotificationSettings, PrivacySettings } from "@/types/setting";




// ─── API ──────────────────────────────────────────────────────────────────────

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all settings
    getAllSettings: builder.query<AllSettings, void>({
      query: () => "/players/settings/all/",
      providesTags: ["Settings"],
    }),

    // PATCH notification settings
    updateNotificationSettings: builder.mutation<
      NotificationSettings,
      Partial<NotificationSettings>
    >({
      query: (body) => ({
        url: "/api/players/settings/notifications/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    // PATCH privacy settings
    updatePrivacySettings: builder.mutation<
      PrivacySettings,
      Partial<PrivacySettings>
    >({
      query: (body) => ({
        url: "/api/players/settings/privacy/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    // PATCH account settings
    updateAccountSettings: builder.mutation<
      AccountSettings,
      Partial<AccountSettings>
    >({
      query: (body) => ({
        url: "/players/settings/account/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    // POST change password
    changePassword: builder.mutation<{ message: string }, ChangePasswordPayload>(
      {
        query: (body) => ({
          url: "/players/settings/change_password/",
          method: "POST",
          body,
        }),
      }
    ),

    // POST download data
    downloadData: builder.mutation<{ download_url: string }, void>({
      query: () => ({
        url: "/players/settings/download_data/",
        method: "POST",
      }),
    }),

    // DELETE account
    deleteAccount: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/players/settings/delete_account/",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useUpdatePrivacySettingsMutation,
  useUpdateAccountSettingsMutation,
  useChangePasswordMutation,
  useDownloadDataMutation,
  useDeleteAccountMutation,
} = settingApi;