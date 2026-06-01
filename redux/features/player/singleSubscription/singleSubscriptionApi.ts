import { baseApi } from "@/redux/api/baseApi";

export interface Plan {
  plan_id: string;
  logo: string;
  logo_url: string;
  title: string;
  description: string;

  features: Feature[];

  monthly_price: string;
  yearly_price: string;

  discount_percentage: string;
  discount_label: string;

  monthly_price_after_discount: number;
  yearly_price_after_discount: number;

  status: "ACTIVE" | "INACTIVE" | string;
  is_featured: boolean;
  display_order: number;
  subscribers_count: number;

  created_at: string;
  updated_at: string;
}

export interface PlanResponse {
  success: boolean;
  count: number;
  data: Plan[];
}

export interface Feature {
  [key: string]: string;
}

export const singleSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<PlanResponse, void>({
      query: () => "/subscriptions/plans/",
    }),

    createPublicCheckout: build.mutation<
      { session_url: string; session_id: string; success: boolean },
      {
        plan_id: string;
        billing_cycle: "MONTHLY" | "YEARLY";
        promo_code?: string;
      }
    >({
      query: (body) => ({
        url: "/subscriptions/checkout/create/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetSubscriptionPlansQuery, useCreatePublicCheckoutMutation } =
  singleSubscriptionApi;
