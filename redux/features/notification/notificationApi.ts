import { baseApi } from "../../api/baseApi";
import { 
  NotificationResponse, 
  NotificationSummary, 
  NotificationSettings 
} from "@/types/notification/notificationType";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, { page?: number } | void>({
      query: (params) => {
        const page = params && 'page' in params ? params.page : 1;
        return `/notifications/?page=${page}`;
      },
      providesTags: ["Notification"],
    }),
    getNotificationSummary: builder.query<{ success: boolean; summary: NotificationSummary }, void>({
      query: () => "/notifications/summary/",
      providesTags: ["Notification"],
    }),
    markAsRead: builder.mutation<{ success: boolean; message: string }, { notification_ids: number[] }>({
      query: (data) => ({
        url: "/notifications/mark-read/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => "/notifications/settings/",
      providesTags: ["Notification"],
    }),
    updateNotificationSettings: builder.mutation<NotificationSettings, Partial<NotificationSettings>>({
      query: (data) => ({
        url: "/notifications/settings/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<{ success: boolean }, number | string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsQuery,
  useGetNotificationSummaryQuery,
  useGetNotificationSettingsQuery,
  useMarkAsReadMutation,
  useUpdateNotificationSettingsMutation,
  useDeleteNotificationMutation,
} = notificationApi;
