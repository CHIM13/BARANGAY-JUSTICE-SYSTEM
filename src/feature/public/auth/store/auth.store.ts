import { create } from "zustand";
import {
  AuthStoreBlueprint,
  LocalStorageCredentials,
} from "../types/auth.interface";

const useAuthStore = create<AuthStoreBlueprint>((set) => ({
  credentials: null,

  setCredentials: (value: LocalStorageCredentials | null) =>
    set(() => ({ credentials: value })),
  removeCredentials: () => set({ credentials: null }),
}));

export default useAuthStore;
