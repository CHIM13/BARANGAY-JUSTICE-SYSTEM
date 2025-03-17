import { useForm } from "react-hook-form";
import { otpAccountValidation } from "../../validation/otp.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@/common/hooks/query/useMutate";
import api from "@/api/client";
import { toast } from "@/common/components/atoms/ui/sonner";
import { useNavigate } from "react-router-dom";

const useOTP = (token: string) => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpAccountValidation),
  });

  const mutation = useMutate({
    mutationKey: ["otp-account"],
    mutationFn: async (data) => {
      const response = await api.post(
        `/auth/checkpoint/account/verify/${token}`,
        data
      );
      return response.data;
    },
    onSuccess: (result) => {
      const {
        payload: { link },
        message,
      } = result;

      navigate({ pathname: link });
      toast.success(message);
    },
  });
  return { form, ...mutation };
};

export default useOTP;
