import { FormFieldConfig } from "@/utils/form/form-builder/types";

const changePasswordFormConfig: FormFieldConfig[] = [
  {
    fieldType: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    showRequirements: true,
  },
  {
    fieldType: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your Password",
    showRequirements: false,
  },
];

export default changePasswordFormConfig;
