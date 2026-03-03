import { baseApi } from "@/redux/api/baseApi";
import { ScoutProfile } from "@/types/scout/profileType";

export const scoutProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET — API returns array, pick first item
    getProfile: builder.query<ScoutProfile, void>({
      query: () => "/scout-agent/profile/",
      transformResponse: (response: ScoutProfile[] | ScoutProfile) => {
        if (Array.isArray(response)) return response[0];
        return response;
      },
      providesTags: ["ScoutProfile"],
    }),

    // PATCH — update existing profile, id is dynamic
    updateProfile: builder.mutation<
      ScoutProfile,
      { id: number; data: FormData | Partial<ScoutProfile> }
    >({
      query: ({ id, data }) => ({
        url: `/scout-agent/profile/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ScoutProfile"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = scoutProfileApi;