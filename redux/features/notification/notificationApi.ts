import { baseApi } from "../../api/baseApi";
import { 
  NotificationResponse, 
  NotificationSummary, 
  NotificationSettings 
} from "@/types/notification/notificationType";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, { page?: number } | void>({
      query: (params) => ({
        url: "/notifications/",
        params: params || {},
      }),
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
    updateSettings: builder.mutation<{ success: boolean; message: string; settings: any }, NotificationSettings>({
      query: (data) => ({
        url: "/notifications/settings/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotificationSummary: builder.query<{ success: boolean; summary: NotificationSummary }, void>({
      query: () => "/notifications/summary/",
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/notifications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useUpdateSettingsMutation,
  useGetNotificationSummaryQuery,
  useDeleteNotificationMutation,
} = notificationApi;
