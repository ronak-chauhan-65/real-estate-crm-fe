import { callApi } from "./callApi";

export const BuildingApi = {
  getBuilding: async (data) =>
    await callApi({
      endpoint: "/building/getAll",
      method: "POST",
      body: data,
    }),
  PostBuilding: async (data) =>
    await callApi({
      endpoint: "/building",
      method: "POST",
      body: data,
    }),
  DeleteBuilding: async (id) =>
    await callApi({
      endpoint: `/building`,
      method: "DELETE",
      id: id,
    }),
  UpdateBuilding: async (id, data) =>
    await callApi({
      endpoint: `/building`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};
