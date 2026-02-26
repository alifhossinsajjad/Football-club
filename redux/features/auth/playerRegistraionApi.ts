
import { baseApi } from "@/redux/api/baseApi";
import { PlayerRegisterPayload } from "@/types/player";


export const playerRegisterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerPlayer: builder.mutation<any, PlayerRegisterPayload>({
      query: (data) => ({
        url: "/account/player-registration/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterPlayerMutation } = playerRegisterApi;