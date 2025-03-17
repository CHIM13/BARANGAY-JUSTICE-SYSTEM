import { Button } from "@/common/components/atoms/ui/button";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { FormBase } from "@/common/components/atoms/ui/form";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/use-register";
import FormBuilder from "@/utils/form/form-builder";
import registerFormConfig from "./register-form.config";
import AuthLayout from "@/common/components/template/layout/auth-layout";

const RegisterPage = () => {
  const { form } = useRegister();

  const onSubmit = () => {};

  return (
    <AuthLayout title="Create an Account">
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder fields={registerFormConfig} className="mb-4" />

          <XStack className="justify-between items-center">
            <XStack className="gap-2 items-center">
              <Checkbox />
              <XStack className="space-x-2">
                <span>Do you agree on your</span>
                <Link
                  to="#"
                  className="text-blue-500 underline underline-offset-2"
                >
                  Terms and Agreement
                </Link>
              </XStack>
            </XStack>
          </XStack>

          <Button className="mb-8 ">Register</Button>
          <XStack className="gap-2 items-center justify-center">
            <span>Already have an account</span>
            <Link
              to="/login"
              className="text-blue-500 underline underline-offset-2"
            >
              Login your account
            </Link>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default RegisterPage;
