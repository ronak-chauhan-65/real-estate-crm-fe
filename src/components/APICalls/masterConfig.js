import { callApi } from "./callApi";

export const masterConfigAPI = {
  getMasterConfig: async (params) =>
    await callApi({
      endpoint: "/masterConfig",
      method: "GET",
      params,
    }),
};

export async function getMasterConfigg(params) {
  return await callApi({
    endpoint: "/masterConfig",
    method: "GET",
    params,
  });
}

export async function postMasterConfigg(data) {
  return await callApi({
    endpoint: "/masterConfig",
    method: "POST",
    body: data,
  });
}
