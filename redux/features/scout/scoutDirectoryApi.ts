import { baseApi } from "@/redux/api/baseApi";

export interface ScoutDirectoryResult {
  id: number;
  scout_logo: string | null;
  scout_name: string;
  position: string;
  location: string | null;
  specialization: string[];
  experience: number;
  connections: number;
}

export interface ScoutDirectoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ScoutDirectoryResult[];
}

export interface ScoutProfileDetail {
  id: number;
  cover_image: string | null;
  profile_image: string | null;
  scout_name: string | null;
  bio: string | null;
  location: string | null;
  experience_years: number;
  connections: number;
  about: string | null;
  specialization: string[];
  joined: string;
  dashboard_stats: {
    players_viewed: number;
    shortlisted_players: number;
    upcoming_events: number;
    active_conversations: number;
  };
  achievements: any[];
  scouting_statistics: any;
  notable_discoveries: any[];
  scouting_regions: any[];
  professional_history: any[];
  email: string | null;
  phone: string | null;
  website: string | null;
  twitter: string | null;
  facebook: string | null;
  youtube: string | null;
  club_affiliations: any[];
  languages: string[];
  preferred_leagues: string | null;
  contact_status: string | null;
  availability: string | null;
  profile_visibility: string | null;
  contact_requests: boolean;
  show_online_status: boolean;
  activity_history: boolean;
}

export const scoutDirectoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScouts: builder.query<ScoutDirectoryResponse, void>({
      query: () => "/scout-agent/scout-directory/",
      providesTags: ["ScoutProfile"],
    }),
    getScoutProfileById: builder.query<ScoutProfileDetail, number>({
      query: (id) => `/scout-agent/scout-directory/${id}/profile/`,
      providesTags: ["ScoutProfile"],
    }),
  }),
});

export const { useGetAllScoutsQuery, useGetScoutProfileByIdQuery } =
  scoutDirectoryApi;
