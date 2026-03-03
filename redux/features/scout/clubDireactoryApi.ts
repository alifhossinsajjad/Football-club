import { baseApi } from "@/redux/api/baseApi";

// types/scout/clubTypes.ts

export interface Club {
  id: number;
  club_logo: string | null;
  club_name: string;
  country: string;
  club_type: string;
  location: string;
  established_year: number;
  current_players: number;
  recent_achievement: string;
}

export interface ClubListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Club[];
}

export const clubDirectoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClubs: builder.query<ClubListResponse, void>({
      query: () => ({
        url: "/scout-agent/club-directory/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllClubsQuery } = clubDirectoryApi;
