import { callApi } from "./callApi";

export const UserApiList = {
  getUser: async (params) =>
    await callApi({
      endpoint: "/auth/users",
      method: "GET",
      params,
    }),
};
