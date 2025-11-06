import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

/**
 * Common toast function for consistent notifications
 * @param {"success" | "error" | "info" | "warn"} type - toast type
 * @param {string} message - message to display
 * @param {object} options - optional overrides
 */
export const showToast = (type = "info", message = "", options = {}) => {
  const config = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "warn":
      toast.warn(message, config);
      break;
    case "info":
    default:
      toast.info(message, config);
      break;
  }
};
