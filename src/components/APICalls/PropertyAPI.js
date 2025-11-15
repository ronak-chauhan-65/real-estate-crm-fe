import { callApi } from "./callApi";

export const ProprtyAPI = {
  getProperty: async (data) =>
    await callApi({
      endpoint: "/property/getAll",
      method: "POST",
      body: data,
    }),
  PostProperty: async (data) =>
    await callApi({
      endpoint: "/property",
      method: "POST",
      body: data,
    }),
  DeleteProperty: async (id) =>
    await callApi({
      endpoint: `/building`,
      method: "DELETE",
      id: id,
    }),
  UpdateProperty: async (id, data) =>
    await callApi({
      endpoint: `/building`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};
