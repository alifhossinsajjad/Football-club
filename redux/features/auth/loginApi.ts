import { baseApi } from "@/redux/api/baseApi";
import { LoginPayload, LoginResponse } from "@/types/auth";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({
        url: "/account/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

