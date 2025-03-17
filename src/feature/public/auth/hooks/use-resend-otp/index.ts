import api from "@/api/client";
import { toast } from "@/common/components/atoms/ui/sonner";
import useMutate from "@/common/hooks/query/useMutate";

const useResendOtp = () => {
  return useMutate({
    mutationKey: ["resend-otp"],
    mutationFn: async () => await api.post("/auth/resend-otp"),

    onSuccess: (data) => {
      console.log(data);
      toast.success("OTP sent successfully");
    },
  });
};

export default useResendOtp;
