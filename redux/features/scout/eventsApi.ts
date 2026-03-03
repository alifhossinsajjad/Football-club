import { baseApi } from "@/redux/api/baseApi";
import { EventListResponse } from "@/types/scout/eventsType"; 

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<EventListResponse, void>({
      query: () => "/scout-agent/event-discovery/",
      providesTags: ["Events"], 
    }),
  }),
});

export const { useGetAllEventsQuery } = eventsApi;