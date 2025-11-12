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

export async function UpdateMasterConfigg(id, data) {
  return await callApi({
    endpoint: `/masterConfig`,
    method: "PATCH",
    id, // goes in URL → /config/property-plan-type/:id
    body: data, // the updated fields
  });
}

export async function deleteMasterConfigg(id) {
  return await callApi({
    endpoint: `/masterConfig`,
    method: "DELETE",
    id: id,
  });
}



