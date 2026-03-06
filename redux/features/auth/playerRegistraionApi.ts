import { baseApi } from "@/redux/api/baseApi";
import { PlayerRegisterPayload } from "@/types/player";
import { PlayerRegisterResponse } from "@/types/auth";

export const playerRegisterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerPlayer: builder.mutation<
      PlayerRegisterResponse,
      PlayerRegisterPayload
    >({
      query: (data) => ({
        url: "/account/player-registration/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterPlayerMutation } = playerRegisterApi;