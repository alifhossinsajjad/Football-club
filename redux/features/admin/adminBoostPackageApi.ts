import { baseApi } from "../../api/baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BoostPackage {
  id: number;
  duration: string;
  price: string;
  discount: number;
  features: string[];
  is_active: boolean;
  created_at?: string;
}

export interface BoostPackageListResponse {
  success: boolean;
  data: BoostPackage[];
}

export interface BoostPackageSingleResponse {
  success: boolean;
  data: BoostPackage;
  message?: string;
}

export interface BoostPackageToggleResponse {
  success: boolean;
  message: string;
  is_active: boolean;
}

export interface BoostPackageDeleteResponse {
  success: boolean;
  message: string;
}

export interface CreateBoostPackagePayload {
  duration: string;
  price: number;
  discount: number;
  features: string[];
  is_active: boolean;
}

export interface UpdateBoostPackagePayload {
  price?: number;
  discount?: number;
  features?: string[];
  is_active?: boolean;
}

// ─── API Slice ────────────────────────────────────────────────────────────────

export const adminBoostPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminBoostPackages: builder.query<BoostPackageListResponse, void>({
      query: () => "/admin-dashboard/boost-packages/",
      providesTags: ["BoostPackages"],
    }),

    getBoostPackageById: builder.query<BoostPackageSingleResponse, number | string>({
      query: (id) => `/admin-dashboard/boost-packages/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "BoostPackages", id }],
    }),

    createBoostPackage: builder.mutation<BoostPackageSingleResponse, CreateBoostPackagePayload>({
      query: (data) => ({
        url: "/admin-dashboard/boost-packages/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BoostPackages"],
    }),

    updateBoostPackage: builder.mutation<
      BoostPackageSingleResponse,
      { id: number | string; data: UpdateBoostPackagePayload }
    >({
      query: ({ id, data }) => ({
        url: `/admin-dashboard/boost-packages/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "BoostPackages",
        { type: "BoostPackages", id },
      ],
    }),

    toggleBoostPackageStatus: builder.mutation<BoostPackageToggleResponse, number | string>({
      query: (id) => ({
        url: `/admin-dashboard/boost-packages/${id}/toggle-status/`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        "BoostPackages",
        { type: "BoostPackages", id },
      ],
    }),

    deleteBoostPackage: builder.mutation<BoostPackageDeleteResponse, number | string>({
      query: (id) => ({
        url: `/admin-dashboard/boost-packages/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["BoostPackages"],
    }),
  }),
});

export const {
  useGetAdminBoostPackagesQuery,
  useGetBoostPackageByIdQuery,
  useCreateBoostPackageMutation,
  useUpdateBoostPackageMutation,
  useToggleBoostPackageStatusMutation,
  useDeleteBoostPackageMutation,
} = adminBoostPackageApi;
