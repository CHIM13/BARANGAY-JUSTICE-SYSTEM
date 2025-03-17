import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

export interface LocalStorageCredentials extends Pick<AccountSchema, "role"> {
  UID: string;
  token: string;
  role: AccountSchema["role"];
}

export interface AuthStoreBlueprint {
  credentials: LocalStorageCredentials | null;
  setCredentials: (value: LocalStorageCredentials | null) => void;
  removeCredentials: () => void;
}
