import api from "@/api/client";
import useMutate from "@/common/hooks/query/useMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRegisterValue } from "../../types/register.interface";
import RegisterValidation from "../../validation/register.validation";

export const useRegister = () => {
  const form = useForm<IRegisterValue>({
    resolver: zodResolver(RegisterValidation),
  });

  const mutate = useMutate({
    mutationKey: ["/POST /auth/register"],
    mutationFn: async () => {
      const result = await api.post("/");
      return result.data;
    },
  });

  return { form, mutate };
};

export default useRegister;
