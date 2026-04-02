import { baseApi } from "@/redux/api/baseApi";
import { HeroResponse } from "@/types/home";

export interface PublicSettings {
  platformName: string;
  tagline: string;
  platformLogo: string;
  favicon: string;
  brandColors: {
    primaryCyan: string;
    backgroundCard: string;
    backgroundDark: string;
    primaryMagenta: string;
  };
}

export const homeApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
    getHeroData: builder.query<HeroResponse, void>({
      query: () => "/admin-dashboard/home/hero/",
      providesTags: ["Dashboard"],
    }),
    getUpcomingEvents: builder.query<any, void>({
      query: () => "/admin-dashboard/home/upcoming-events/",
      providesTags: ["Events"],
    }),
    getLatestNewsArticles: builder.query<any, void>({
      query: () => "/admin-dashboard/home/latest-news/",
      providesTags: ["Dashboard"],
    }),
    getFeaturedPlayers: builder.query<any, void>({
      query: () => "/admin-dashboard/home/featured-players/",
      providesTags: ["Discovery"],
    }),
    getPublicSettings: builder.query<PublicSettings, void>({
      query: () => "/admin-dashboard/settings/public/",
      transformResponse: (response: { data: PublicSettings }) => response.data || response,
      providesTags: ["Dashboard"],
    }),
   }),
});

export const { 
  useGetHeroDataQuery, 
  useGetPublicSettingsQuery, 
  useGetUpcomingEventsQuery, 
  useGetLatestNewsArticlesQuery, 
  useGetFeaturedPlayersQuery 
} = homeApi;