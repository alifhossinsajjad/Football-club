import { baseApi } from "@/redux/api/baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PromoCode {
  id: number;
  code: string;
  is_valid: boolean;
  stripe_coupon_id: string | null;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: string | number;
  applicable_to: string;
  max_uses: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PromoCodesResponse {
  success: boolean;
  data: PromoCode[];
}

export interface CreatePromoCodeRequest {
  code: string;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: number;
  applicable_to: string;
  max_uses: number;
  valid_from: string;
  valid_until: string;
}

export interface CreatePromoCodeResponse {
  success: boolean;
  message: string;
  data: PromoCode;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const adminPromoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCodes: builder.query<PromoCodesResponse, void>({
      query: () => "/admin-dashboard/promo-codes/",
      providesTags: ["Promo"],
    }),
    getPromoCodeByCode: builder.query<CreatePromoCodeResponse, string>({
      query: (code) => `/admin-dashboard/promo-codes/${code}/`,
      providesTags: (result, error, code) => [{ type: "Promo", id: code }],
    }),
    createPromoCode: builder.mutation<CreatePromoCodeResponse, CreatePromoCodeRequest>({
      query: (data) => ({
        url: "/admin-dashboard/promo-codes/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Promo"],
    }),
    deletePromoCode: builder.mutation<{ success: boolean; message: string }, string>({
      query: (code) => ({
        url: `/admin-dashboard/promo-codes/${code}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promo"],
    }),
    updatePromoStatus: builder.mutation<CreatePromoCodeResponse, { code: string; status: "ACTIVE" | "INACTIVE" | "EXPIRED" }>({
      query: ({ code, status }) => ({
        url: `/admin-dashboard/promo-codes/${code}/`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Promo"],
    }),
    validatePromoCode: builder.mutation<
      { success: boolean; data: { code: string; discount_type: string; discount_value: number; original_amount: number; discount_amount: number; final_amount: number; stripe_coupon_id: string } }, 
      { code: string; amount: number; usage_type: "EVENT" | "BOOST" }
    >({
      query: (data) => ({
        url: "/payments/validate-promo/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPromoCodesQuery,
  useGetPromoCodeByCodeQuery,
  useCreatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useUpdatePromoStatusMutation,
  useValidatePromoCodeMutation,
} = adminPromoApi;
