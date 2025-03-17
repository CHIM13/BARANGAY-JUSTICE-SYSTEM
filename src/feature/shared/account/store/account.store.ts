import { create } from "zustand";
import { AccountSchema } from "../interfaces/account.interface";

interface AccountStoreBlueprint {
  credentials: AccountSchema | null;
  setCredentials: (value: AccountSchema | null) => void;
  removeCredentials: () => void;
}

const useAuthStore = create<AccountStoreBlueprint>((set) => ({
  credentials: null,

  setCredentials: (value: AccountSchema | null) =>
    set(() => ({ credentials: value })),
  removeCredentials: () => set({ credentials: null }),
}));

export default useAuthStore;
