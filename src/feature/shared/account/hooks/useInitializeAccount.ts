import useLocalStorage from "@/common/hooks/utils/useLocalStorage";
import useAccountStore from "@/feature/public/auth/store/account.store";
import { useEffect } from "react";

const useInitializeAccount = () => {
  const { getInitialAccount, setInitialAccount } = useAccountStore();
  const { getItem } = useLocalStorage("credentials");

  useEffect(() => {
    (async () => {
      const credentials = (await getItem()) as {
        UID: string;
        role: string;
      };

      if (credentials) {
        setInitialAccount({
          _id: credentials.UID,
          role: credentials.role,
        });
      }
    })();
  }, []);

  return {
    account: getInitialAccount(),
  };
};

export default useInitializeAccount;
