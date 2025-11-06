import { callApi } from "./callApi";

export const authApi = {
  createAuth: async (data) =>
    await callApi({
      endpoint: "/auth/login",
      method: "POST",
      body: data,
    }),
};
