import { callApi } from "./callApi";

export const BuildingApi = {
  getPropertyType: async (params) =>
    await callApi({
      endpoint: "/config/property-plan-type",
      method: "GET",
      params,
    }),
  PostPropertyType: async (data) =>
    await callApi({
      endpoint: "/config/property-plan-type",
      method: "POST",
      body: data,
    }),
  DeletePropertyType: async (id) =>
    await callApi({
      endpoint: `/config/property-plan-type`,
      method: "DELETE",
      id: id,
    }),
  UpdatePropertyType: async (id, data) =>
    await callApi({
      endpoint: `/config/property-plan-type`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};
