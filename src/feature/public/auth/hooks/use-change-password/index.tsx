import api from "@/api/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordValidation } from "../../validation/change-password.validation";
import useMutate from "@/common/hooks/query/useMutate";
import { ChangePasswordCredentials } from "../../types/change-password.interface";
import { toast } from "@/common/components/atoms/ui/sonner";
import { useNavigate } from "react-router-dom";

const useChangePassword = (token: string) => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changePasswordValidation),
  });

  const mutation = useMutate({
    mutationKey: ["change-password"],
    mutationFn: async (data: ChangePasswordCredentials) => {
      const result = await api.post(
        `/auth/checkpoint/account/reset-password/${token}`,
        data
      );
      return result.data;
    },

    onSuccess: () => {
      navigate("/login");
      toast.success("Password changed successfully");
    },
  });

  return { form, ...mutation };
};

export default useChangePassword;
