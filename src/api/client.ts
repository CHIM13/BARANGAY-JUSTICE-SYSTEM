import applicationConfig from "@/config/application.config";
import axios from "axios";
import { ServerError, ServerNotRespondingError } from "./network.class";

const api = axios.create({
  baseURL: applicationConfig.VITE_DEV_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    window.dispatchEvent(new Event("api-success"));
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(new ServerNotRespondingError());
    }

    const status = error.response.status;
    const message = error.response.data?.error || "Server error";

    if (error.response.status === 401) {
      window.localStorage.removeItem("app:credentials");
      window.location.href = "/";
      throw new Error("AUTH_ERROR");
    }

    if (status >= 500) {
      throw new ServerError(message, status, "SERVER_ERROR");
    }

    return Promise.reject(new ServerError(message, status, "SERVER_ERROR"));
  }
);

export default api;
