/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_ENVIRONMENT: string;
  readonly VITE_DEV_BACKEND_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
