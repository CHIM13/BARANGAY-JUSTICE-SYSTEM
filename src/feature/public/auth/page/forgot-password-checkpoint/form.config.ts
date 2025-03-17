import { FormFieldConfig } from "@/utils/form/form-builder/types";

const forgotPasswordCheckpointConfig: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "otp",
    label: "OTP",
    placeholder: "Enter your OTP",
  },
];

export default forgotPasswordCheckpointConfig;
