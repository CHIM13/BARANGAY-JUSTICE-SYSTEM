import {
  Account,
  InitialAccount,
} from "@/feature/shared/account/interfaces/account.interface";
import { create } from "zustand";

interface AccountStoreBlueprint {
  account: Account | InitialAccount | null;
  setAccount: (account: Account) => void;
  setInitialAccount: (account: InitialAccount | null) => void;
  removeAccount: () => void;
  getAccount: () => Account | null;
  getInitialAccount: () => InitialAccount | null;
}

const useAccountStore = create<AccountStoreBlueprint>((set, get) => ({
  account: null,
  setAccount: (account: Account) => set({ account }),
  setInitialAccount: (account: InitialAccount | null) => set({ account }),
  removeAccount: () => set({ account: null }),
  getInitialAccount: () => get().account as InitialAccount | null,
  getAccount: () => get().account as Account | null,
}));

export default useAccountStore;
