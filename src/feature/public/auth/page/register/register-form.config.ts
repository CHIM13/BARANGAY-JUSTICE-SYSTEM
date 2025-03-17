import { FormFieldConfig } from "@/utils/form/form-builder/types";

const registerFormConfig: FormFieldConfig[] = [
  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter your First Name",
      },
      {
        fieldType: "input",
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter your Last Name",
      },
    ],
  },

  {
    fieldType: "input",
    type: "email",
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
    showRequirements: true,
  },
];

export default registerFormConfig;
