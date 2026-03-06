// redux/features/profile/profileAndSettingApi.ts

import { baseApi } from "@/redux/api/baseApi";

export const profileAndEditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET PROFILE
    getMyProfile: builder.query<any, void>({
      query: () => ({
        url: "/players/profile/me/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // ✅ UPDATE PROFILE
    updateProfile: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/players/profile/update_profile/",
        method: "PATCH",
        body: data, // FormData supported now
      }),
      invalidatesTags: ["Profile"],
    }),

    // ✅ PLAYING HISTORY
    addPlayingHistory: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/playing-history/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    updatePlayingHistory: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/players/playing-history/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deletePlayingHistory: builder.mutation<any, number>({
      query: (id) => ({
        url: `/players/playing-history/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    // ✅ ACHIEVEMENTS
    addAchievement: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/achievements/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateAchievement: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/players/achievements/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteAchievement: builder.mutation<any, number>({
      query: (id) => ({
        url: `/players/achievements/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    // ✅ HIGHLIGHT VIDEOS
    addHighlightVideo: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/highlight-videos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateHighlightVideo: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/players/highlight-videos/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteHighlightVideo: builder.mutation<any, number>({
      query: (id) => ({
        url: `/players/highlight-videos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useAddPlayingHistoryMutation,
  useUpdatePlayingHistoryMutation,
  useDeletePlayingHistoryMutation,
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useAddHighlightVideoMutation,
  useUpdateHighlightVideoMutation,
  useDeleteHighlightVideoMutation,
} = profileAndEditApi;
