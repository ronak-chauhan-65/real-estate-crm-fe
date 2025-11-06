import { callApi } from "./callApi";







// get CRM logs
export const logsAPI = {
  GetLog: async (userId, currentPage = 1) =>
    await callApi({
      endpoint: `/auth/userLogs/${userId}`,
      method: "GET",
      params: { currentPage },
    }),
};
