import { FormFieldConfig } from "@/utils/form/form-builder/types";

const createRespondentFormConfig: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter the first name",
  },
  {
    fieldType: "input",
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter the last name",
  },
  {
    fieldType: "input",
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter the email",
  },
  {
    fieldType: "input",
    type: "tel",
    name: "phone",
    label: "Phone",
    placeholder: "Enter the phone",
  },
];

export default createRespondentFormConfig;
