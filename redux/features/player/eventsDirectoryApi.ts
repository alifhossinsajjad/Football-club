import { EventListResponse, EventRegistration } from "@/types/scout/eventsType";
import { baseApi } from "../../api/baseApi";

export const eventsDirectoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventListResponse, void>({
      query: () => "/events/",
    }),
    getEventDetails: builder.query<any, string | number>({
      query: (id) => `/events/${id}/`,
    }),
    getMyRegistrations: builder.query<EventRegistration[], void>({
      query: () => `/players/event-registrations/`,
      providesTags: ["Events"],
    }),
    checkout: builder.mutation<
      any,
      {
        registration_id: string;
        success_url: string;
        cancel_url: string;
        promo_code?: string;
      }
    >({
      query: (data) => ({
        url: "/players/event-registration/checkout/",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation<
      any,
      { session_id: string; registration_id: string }
    >({
      query: (data) => ({
        url: "/players/event-registration/verify-payment/",
        method: "POST",
        body: data,
      }),
    }),
 getRegistrationStatus: builder.query<any, string>({
  query: (registration_id) =>
    `/players/event-registration/${registration_id}/status/`,
}),
    createRegistration: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/event-registration/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"], // 🔥 important
    }),
    applyPromoCode: builder.mutation<
      any,
      { code: string; event_id: number | string }
    >({
      query: (data) => ({
        url: "/payments/apply-promo/",
        method: "POST",
        body: data,
      }),
    }),
    validatePromo: builder.mutation<
      any,
      { code: string; amount: number; usage_type: string }
    >({
      query: (data) => ({
        url: "/players/promo/validate/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useCreateRegistrationMutation,
  useCheckoutMutation,
  useVerifyPaymentMutation,
  useGetRegistrationStatusQuery,
  useGetMyRegistrationsQuery,
  useApplyPromoCodeMutation,
  useValidatePromoMutation,
} = eventsDirectoryApi;
