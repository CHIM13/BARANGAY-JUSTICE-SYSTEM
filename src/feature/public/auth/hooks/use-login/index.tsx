import api from "@/api/client";
import useMutate from "@/common/hooks/query/useMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginValidation from "../../validation/login.validation";
import { useForm } from "react-hook-form";
import { LoginRequestValue } from "../../types/login.interface";
import { toast } from "@/common/components/atoms/ui/sonner";
import useLocalStorage from "@/common/hooks/utils/useLocalStorage";
import useAccountStore from "../../store/account.store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setAccount } = useAccountStore();
  const { setItem } = useLocalStorage("credentials");
  const router = useNavigate();
  const form = useForm<LoginRequestValue>({
    defaultValues: {
      email: "",

      password: "",
    },
    resolver: zodResolver(LoginValidation),
  });

  const mutate = useMutate({
    mutationKey: ["/POST /auth/login"],
    mutationFn: async (data: LoginRequestValue) =>
      await api.post("/auth/login", data),

    onSuccess: (result) => {
      const { payload } = result.data;

      setItem(payload);
      setAccount(payload);

      router("/");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { form, ...mutate };
};

export default useLogin;
