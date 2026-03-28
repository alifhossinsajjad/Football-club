import { baseApi } from "@/redux/api/baseApi";

export interface HeroSettings {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;
  background_color: string;
  title_color: string;
  subtitle_color: string;
  hero_image: string;
  is_active: boolean;
}

export interface HeroSettingsResponse {
  success: boolean;
  message: string;
  data: HeroSettings;
}

export interface HeroListResponse {
  success: boolean;
  data: HeroSettings[];
}

export interface FeaturedClub {
  id?: number;
  club_name: string;
  club_logo: string;
  club_type: string;
  order: number;
  is_active?: boolean;
}

export interface FeaturedClubResponse {
  success: boolean;
  message?: string;
  data: FeaturedClub;
}

export const adminHomePageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSettings: builder.query<HeroSettings[], void>({
      query: () => "/admin-dashboard/home/hero/",
      transformResponse: (response: { data: HeroSettings[] }) => response?.data || response,
      providesTags: ["Dashboard"],
    }),
    createHeroSettings: builder.mutation<HeroSettingsResponse, Partial<HeroSettings>>({
      query: (payload) => ({
        url: "/admin-dashboard/home/hero/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateHeroSettings: builder.mutation<HeroSettingsResponse, Partial<HeroSettings>>({
      query: (payload) => ({
        url: `/admin-dashboard/home/hero/${payload.id}/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    deleteHeroSettings: builder.mutation<{ success: boolean; message?: string }, number>({
      query: (id) => ({
        url: `/admin-dashboard/home/hero/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getFeaturedClubs: builder.query<FeaturedClub[], void>({
      query: () => "/admin-dashboard/home/featured-clubs/",
      transformResponse: (response: { data: FeaturedClub[] }) => response?.data || response,
      providesTags: ["Dashboard"],
    }),
    createFeaturedClub: builder.mutation<FeaturedClubResponse, Partial<FeaturedClub>>({
      query: (payload) => ({
        url: "/admin-dashboard/home/featured-clubs/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateFeaturedClub: builder.mutation<FeaturedClubResponse, Partial<FeaturedClub>>({
      query: (payload) => ({
        url: `/admin-dashboard/home/featured-clubs/${payload.id}/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    deleteFeaturedClub: builder.mutation<{ success: boolean; message?: string }, number>({
      query: (id) => ({
        url: `/admin-dashboard/home/featured-clubs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetHeroSettingsQuery,
  useCreateHeroSettingsMutation,
  useUpdateHeroSettingsMutation,
  useDeleteHeroSettingsMutation,
  useGetFeaturedClubsQuery,
  useCreateFeaturedClubMutation,
  useUpdateFeaturedClubMutation,
  useDeleteFeaturedClubMutation,
} = adminHomePageApi;
