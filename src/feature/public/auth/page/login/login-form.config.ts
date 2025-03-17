import { FormFieldConfig } from "@/utils/form/form-builder/types";

const loginFormConfig: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
  },
  {
    fieldType: "password",
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    showRequirements: false,
  },
];

export default loginFormConfig;
