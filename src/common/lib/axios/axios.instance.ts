import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_DEV_ENVIRONMENT === "development"
      ? import.meta.env.VITE_DEV_BASE_URI
      : import.meta.env.VITE_PRODUCTION_BASE_URI,
  withCredentials: true,
});

export const PublicAxios = AxiosInstance;
export const ProtectedAxios = AxiosInstance;
