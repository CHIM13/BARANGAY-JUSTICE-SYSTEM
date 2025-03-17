import api from "@/api/client";
import useMutate from "@/common/hooks/query/useMutate";
import useLocalStorage from "@/common/hooks/utils/useLocalStorage";
import useAccountStore from "@/feature/public/auth/store/account.store";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const { removeItem } = useLocalStorage("app:credentials");
  const { setInitialAccount } = useAccountStore();
  const queryClient = useQueryClient();

  const mutation = useMutate({
    mutationKey: ["logout"],
    mutationFn: async () => await api.delete("/account/logout"),

    onSuccess: () => {
      removeItem();
      setInitialAccount(null);
      queryClient.invalidateQueries();
    },
  });

  const offlineLogout = () => {
    removeItem();
    setInitialAccount(null);
  };

  return {
    logout: mutation.mutate,
    ...mutation,
    offlineLogout,
  };
};

export default useLogout;
