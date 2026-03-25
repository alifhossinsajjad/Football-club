import { baseApi } from "@/redux/api/baseApi";
import { HeroResponse } from "@/types/home";

export const homeApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
    getHeroData: builder.query<HeroResponse, void>({
      query: () => "/admin-dashboard/home/hero/",
      providesTags: ["Dashboard"],
    }),
   }),
});

export const { useGetHeroDataQuery } = homeApi;