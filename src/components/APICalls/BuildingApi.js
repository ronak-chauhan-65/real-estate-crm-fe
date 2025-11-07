import { callApi } from "./callApi";

export const BuildingApi = {
  getBuiling: async (params) =>
    await callApi({
      endpoint: "/config/property-plan-type",
      method: "GET",
      params,
    }),
  PostBuiling: async (data) =>
    await callApi({
      endpoint: "/building",
      method: "POST",
      body: data,
    }),
  DeleteBuiling: async (id) =>
    await callApi({
      endpoint: `/config/property-plan-type`,
      method: "DELETE",
      id: id,
    }),
  UpdateBuilding: async (id, data) =>
    await callApi({
      endpoint: `/config/property-plan-type`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};
