import { baseApi } from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<any, void>({
      query: () => "/players/subscription/",
      providesTags: ["Subscription"],
    }),
    getPaymentHistory: builder.query<any[], void>({
      query: () => "/players/subscription/payment-history/",
      providesTags: ["PaymentHistory"],
    }),
    cancelSubscription: builder.mutation<any, void>({
      query: () => ({
        url: "/players/subscription/cancel/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
    updatePaymentMethod: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/subscription/update-payment/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useGetPaymentHistoryQuery,
  useCancelSubscriptionMutation,
  useUpdatePaymentMethodMutation,
} = subscriptionApi;
