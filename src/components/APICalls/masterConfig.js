import { callApi } from "./callApi";

export const masterConfigAPI = {
  getMasterConfig: async (params) =>
    await callApi({
      endpoint: "/masterConfig",
      method: "GET",
      params,
    }),
};
