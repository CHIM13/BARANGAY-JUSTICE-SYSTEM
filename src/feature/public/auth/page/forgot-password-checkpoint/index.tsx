import { Button } from "@/common/components/atoms/ui/button";
import { FormBase } from "@/common/components/atoms/ui/form";
import FormBuilder from "@/utils/form/form-builder";
import AuthLayout from "@/common/components/template/layout/auth-layout";
import forgotPasswordCheckpointConfig from "./form.config";
import { useParams } from "react-router-dom";
import { XStack } from "@/common/components/atoms/ui/stack";
import useOTP from "../../hooks/use-otp";
import useResendOtp from "../../hooks/use-resend-otp";
import usePreventBackNavigation from "@/hooks/use-prevent-back-navigation";

const ForgotPasswordCheckpointPage = () => {
  const { token } = useParams();

  const {
    form,
    mutate: otpMutation,
    isPending: otpPending,
  } = useOTP(token ?? "");

  const { mutate: resendOtpMutation, isPending: resendOtpPending } =
    useResendOtp();

  const onSubmit = (payload: { otp: string }) => {
    otpMutation(payload);
  };

  const handleResendOTP = () => {
    resendOtpMutation({});
  };

  usePreventBackNavigation("/login", true);

  return (
    <AuthLayout
      title="OTP Verification"
      description="Enter the OTP sent to your email address"
    >
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder
            fields={forgotPasswordCheckpointConfig}
            className="mb-4"
          />

          <Button disabled={otpPending} className="mb-8">
            {otpPending ? "Sending..." : "Submit"}
          </Button>
          <XStack className="gap-2 items-center justify-center">
            <span>Didn't receive the OTP?</span>
            <Button
              variant="link"
              disabled={resendOtpPending}
              onClick={handleResendOTP}
              className="text-blue-500 underline underline-offset-2"
            >
              Resend OTP
            </Button>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default ForgotPasswordCheckpointPage;
