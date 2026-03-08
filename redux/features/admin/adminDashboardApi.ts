import { baseApi } from "@/redux/api/baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatInfo {
  count?: number;
  amount?: number;
  currency?: string;
  change: number;
}

export interface DashboardOverview {
  total_users: StatInfo;
  active_events: StatInfo;
  monthly_revenue: StatInfo;
  subscriptions: StatInfo;
}

export interface AdminActivity {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  type: "player" | "club" | "scout" | "system";
}

export interface AdminDashboardResponse {
  success: boolean;
  data: {
    overview: DashboardOverview;
    recent_activity: AdminActivity[];
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardData: builder.query<AdminDashboardResponse, void>({
      query: () => "/admin-dashboard/dashboard/",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetAdminDashboardDataQuery } = adminDashboardApi;
