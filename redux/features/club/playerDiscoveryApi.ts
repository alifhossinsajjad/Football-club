import { baseApi } from "@/redux/api/baseApi";
import {
  DiscoveryPlayer,
  PlayerDiscoveryFilters,
  PlayerDiscoveryListResponse,
} from "@/types/scout/playerDicoverType";

export const playerDiscoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET list of players
    getDiscoveryPlayers: builder.query<
      PlayerDiscoveryListResponse,
      PlayerDiscoveryFilters
    >({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.position) params.set("position", filters.position);
        if (filters.nationality) params.set("nationality", filters.nationality);
        if (filters.age_min) params.set("age_min", String(filters.age_min));
        if (filters.age_max) params.set("age_max", String(filters.age_max));
        if (filters.search) params.set("search", filters.search);
        if (filters.page) params.set("page", String(filters.page));
        const qs = params.toString();
        return `/scout-agent/player-discovery/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Discovery"],
    }),

    getPlayerDetails: builder.query<DiscoveryPlayer, number>({
      query: (id) => `/scout-agent/player-discovery/${id}/`,
      providesTags: (_result, _err, id) => [{ type: "Discovery", id }],
    }),

    // POST: Add to shortlist
    addToShortlist: builder.mutation<{ id: number }, { player: number }>({
      query: ({ player }) => ({
        url: "/scout-agent/shortlisted-players/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { player },
      }),
    }),

    // DELETE: Remove from shortlist
    removeFromShortlist: builder.mutation<void, number>({
      query: (id) => ({
        url: `/scout-agent/shortlisted-players/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDiscoveryPlayersQuery,
  useGetPlayerDetailsQuery,
  useAddToShortlistMutation,
  useRemoveFromShortlistMutation,
} = playerDiscoverApi;
