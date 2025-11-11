import { callApi } from "./callApi";

export const AreaApiList = {
  getAllArea: async (data) =>
    await callApi({ endpoint: "/area/getArea", method: "POST", body: data }),
  postArea: async (data) =>
    await callApi({
      endpoint: "/area",
      method: "POST",
      body: data,
    }),
  deleteArea: async (id) =>
    await callApi({
      endpoint: `/area`,
      method: "DELETE",
      id: id,
    }),
  UpdateArea: async (id, data) =>
    await callApi({
      endpoint: `/area`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};
