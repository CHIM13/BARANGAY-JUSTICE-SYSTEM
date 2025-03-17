import { Button } from "@/common/components/atoms/ui/button";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { FormBase } from "@/common/components/atoms/ui/form";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/use-login";
import FormBuilder from "@/utils/form/form-builder";
import loginFormConfig from "./login-form.config";
import AuthLayout from "@/common/components/template/layout/auth-layout";
import { LoginRequestValue } from "../../types/login.interface";
import { Label } from "@/common/components/atoms/ui/label";
import { useLoginRememberMe } from "@/hooks/use-remember-me";
import usePreventBackNavigation from "@/hooks/use-prevent-back-navigation";

const LoginPage = () => {
  const { form, mutate } = useLogin();

  const {
    rememberMe,
    toggleRememberMe,
    setData: setSavedCredentials,
  } = useLoginRememberMe({
    storageKey: "login-credentials",
    onDataLoad: (data) => {
      if (data) {
        form.setValue("email", data.email);
      }
    },
  });

  const onSubmit = (values: LoginRequestValue) => {
    if (rememberMe) {
      setSavedCredentials({
        email: values.email,
      });
    }
    mutate(values);
  };

  usePreventBackNavigation("/login", true);

  return (
    <AuthLayout
      title="Login to your Account"
      description="Welcome back! Please enter your details"
    >
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder fields={loginFormConfig} className="mb-4" />

          <XStack className="justify-between items-center">
            <Label className="space-x-2 flex items-center cursor-pointer">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={toggleRememberMe}
                aria-label="Remember login credentials"
              />
              <span>Remember me</span>
            </Label>

            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Forgot password?
            </Link>
          </XStack>

          <Button
            type="submit"
            className="mb-8"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <XStack className="gap-2 items-center justify-center">
            <span className="text-gray-600">Don't have an account?</span>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2 transition-colors"
            >
              Create an account
            </Link>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default LoginPage;
