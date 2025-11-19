import axios from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { navigateTo } from "./navigation";
import { showToast } from "../../utils/toastUtils";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      store.dispatch(logout());
      localStorage.removeItem("user");
      navigateTo("/login"); // 🔥 Redirect WITHOUT page refresh!
      showToast("error", "Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default axios;
