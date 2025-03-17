import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordValidation } from "../../validation/forgot-password.validation";
import useMutate from "@/common/hooks/query/useMutate";
import {
  ForgotPasswordCredentials,
  ForgotPasswordResponse,
} from "../../types/forgot-password.interface";
import api from "@/api/client";
import { ResponseDTO } from "@/feature/shared/other/interface/server.interface";
import { toast } from "@/common/components/atoms/ui/sonner";
import { useNavigate } from "react-router-dom";
const useForgotPassword = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordValidation),
  });

  const mutation = useMutate({
    mutationKey: ["forgot-password"],
    mutationFn: async (data: ForgotPasswordCredentials) => {
      const response = await api.post("/auth/forgot-password", data);
      return response.data as ResponseDTO<ForgotPasswordResponse>;
    },
    onSuccess: ({ payload }) => {
      const { link } = payload;
      toast.success("Redirecting to the link...");
      console.log(link);
      navigate({ pathname: link });
    },
  });

  return { form, ...mutation };
};

export default useForgotPassword;
