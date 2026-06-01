import { baseApi } from "@/redux/api/baseApi";

export interface BoostPackage {
  id: number;
  duration: string;
  price: string;
  discount: number;
  finalPrice: string;
  features: string[];
}

export interface BoostPackagesResponse {
  success: boolean;
  boostPackages: BoostPackage[];
}

export interface CreateCheckoutResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    boostRequestId: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export interface BoostRecord {
  boostRequestId: string;
  duration: string;
  amountPaid: string;
  status: string;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface MyBoostsResponse {
  success: boolean;
  data: BoostRecord[];
}

export const profileBoostingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBoostPackages: builder.query<BoostPackagesResponse, void>({
      query: () => "/players/profile-boost/packages/",
      providesTags: ["Profile"],
    }),
    createBoostCheckout: builder.mutation<CreateCheckoutResponse, { package_id: number }>({
      query: (data) => ({
        url: "/players/profile-boost/create-checkout/",
        method: "POST",
        body: data,
      }),
    }),
    verifyBoostPayment: builder.mutation<VerifyPaymentResponse, { session_id: string }>({
      query: (data) => ({
        url: "/players/profile-boost/verify-payment/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getMyBoosts: builder.query<MyBoostsResponse, void>({
      query: () => "/players/profile-boost/my-boosts/",
      providesTags: ["Profile"],
    }),
    validatePromo: builder.mutation<
      { data: { discount_amount: number } },
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
  useGetBoostPackagesQuery,
  useCreateBoostCheckoutMutation,
  useVerifyBoostPaymentMutation,
  useGetMyBoostsQuery,
  useValidatePromoMutation,
} = profileBoostingApi;