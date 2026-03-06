import { baseApi } from "@/redux/api/baseApi";
import {
  ClubRegisterPayload,
  ClubRegisterResponse,
} from "@/types/club";

export const clubRegisterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerClub: builder.mutation<
      ClubRegisterResponse,
      ClubRegisterPayload
    >({
      query: (data) => ({
        url: "/account/club-academy-registration/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterClubMutation } = clubRegisterApi;