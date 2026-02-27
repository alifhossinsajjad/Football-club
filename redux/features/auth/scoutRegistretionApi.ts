import { baseApi } from "@/redux/api/baseApi";
import { ScoutRegisterPayload } from "@/types/scout";

export const scoutRegistretionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerScout: builder.mutation<unknown, ScoutRegisterPayload>({
      query: (data) => ({
        url: "/account/scout-agent-registration/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterScoutMutation } = scoutRegistretionApi;
