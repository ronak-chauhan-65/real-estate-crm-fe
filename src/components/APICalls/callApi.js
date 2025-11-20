import axios from "./axiosSetup"; // use the interceptor-enabled axios

export const callApi = async (bodyObj = {}) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  try {
    const {
      endpoint = "",
      method = "POST",
      headers = {},
      body = {},
      params = {},
      id = "",
    } = bodyObj;

    if (!endpoint) throw new Error("API endpoint is required");

    const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;

    const config = {
      url,
      method,
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        // "ngrok-skip-browser-warning": "true",
        Authorization: token,
        ...headers,
      },
      data: method !== "GET" ? body : undefined, // for POST, PUT, DELETE
      params: method === "GET" || method === "DELETE" ? params : undefined,
    };

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
    };
  }
};
