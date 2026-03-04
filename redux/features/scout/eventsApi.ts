import { baseApi } from "@/redux/api/baseApi";
import { Event, EventListResponse } from "@/types/scout/eventsType"; // adjust import path

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<EventListResponse, void>({
      query: () => "/scout-agent/event-discovery/",
      providesTags: ["Events"],
    }),
    getEvent: builder.query<Event, number>({
      query: (id) => `/events/${id}/`,
    }),
    registerForEvent: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/scout-agent/event-registrations/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const { useGetAllEventsQuery, useGetEventQuery, useRegisterForEventMutation } = eventsApi;