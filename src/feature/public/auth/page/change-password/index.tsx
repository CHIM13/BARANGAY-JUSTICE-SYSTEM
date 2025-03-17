import { Button } from "@/common/components/atoms/ui/button";
import { FormBase } from "@/common/components/atoms/ui/form";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Link, useParams } from "react-router-dom";
import FormBuilder from "@/utils/form/form-builder";
import AuthLayout from "@/common/components/template/layout/auth-layout";
import changePasswordFormConfig from "./config/form.config";
import usePreventBackNavigation from "@/hooks/use-prevent-back-navigation";
import useChangePassword from "../../hooks/use-change-password";
import { ChangePasswordCredentials } from "../../types/change-password.interface";

const ChangePasswordCheckpointPage = () => {
  const { token } = useParams();
  const { form, mutate, isPending } = useChangePassword(token ?? "");

  const onSubmit = (payload: ChangePasswordCredentials) => {
    console.log(payload);
    mutate(payload);
  };

  usePreventBackNavigation("/login", true);

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email address and we will send you a link to reset your password"
    >
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder fields={changePasswordFormConfig} className="mb-4" />

          <Button disabled={isPending} className="mb-8">
            {isPending ? "Sending..." : "Submit"}
          </Button>
          <XStack className="gap-2 items-center justify-center">
            <span>Don't have an account</span>
            <Link
              to="/login"
              className="text-blue-500 underline underline-offset-2"
            >
              Back to login
            </Link>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default ChangePasswordCheckpointPage;
