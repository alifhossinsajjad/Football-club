// redux/features/profile/profileAndSettingApi.ts

import { baseApi } from "@/redux/api/baseApi";

export const profileAndSettingApi = baseApi.injectEndpoints({
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
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = profileAndSettingApi;