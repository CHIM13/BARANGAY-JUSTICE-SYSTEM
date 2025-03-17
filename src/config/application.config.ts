import { cleanEnv, str } from "envalid";

const applicationConfig = cleanEnv(import.meta.env, {
  VITE_DEV_ENVIRONMENT: str({ default: import.meta.env.VITE_DEV_ENVIRONMENT }),
  VITE_DEV_BACKEND_URI: str({ default: import.meta.env.VITE_DEV_BACKEND_URI }),
});

export default applicationConfig;
