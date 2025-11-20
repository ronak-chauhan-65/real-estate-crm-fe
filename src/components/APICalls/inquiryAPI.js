import { callApi } from "./callApi";

export const InquiryAPI = {
  getInquiry: async (data) =>
    await callApi({ endpoint: "/enquiry/all", method: "POST", body: data }),
  PostInquiry: async (data) =>
    await callApi({ endpoint: "/enquiry", method: "POST", body: data }),
};
