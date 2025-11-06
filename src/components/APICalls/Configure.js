import { callApi } from "./callApi";

// PropertyType
export const PropertyTypeApiList = {
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

// PropertySpecificType
export const PropertySpecificTypeApiList = {
  getPropertySpecificType: async () =>
    await callApi({
      endpoint: "/config/property-specific-type",
      method: "GET",
    }),
  PostPropertySpecificType: async (data) =>
    await callApi({
      endpoint: "/config/property-specific-type",
      method: "POST",
      body: data,
    }),
  DeletePropertySpecificType: async (id) =>
    await callApi({
      endpoint: `/config/property-specific-type`,
      method: "DELETE",
      id: id,
    }),
  UpdatePropertyType: async (id, data) =>
    await callApi({
      endpoint: `/config/property-specific-type`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};

// PropertySpecificType
export const PropertySourceApiList = {
  getPropertySource: async () =>
    await callApi({
      endpoint: "/config/property-source",
      method: "GET",
    }),
  PostPropertySource: async (data) =>
    await callApi({
      endpoint: "/config/property-source",
      method: "POST",
      body: data,
    }),
  DeletePropertySource: async (id) =>
    await callApi({
      endpoint: `/config/property-source`,
      method: "DELETE",
      id: id,
    }),
  UpdatePropertySource: async (id, data) =>
    await callApi({
      endpoint: `/config/property-source`,
      method: "PATCH",
      id, // goes in URL → /config/property-plan-type/:id
      body: data, // the updated fields
    }),
};

