import { FormFieldConfig } from "@/utils/form/form-builder/types";

const createCaseFormConfig: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "caseName",
    label: "Case Name",
    placeholder: "Enter the case name",
  },
];

export default createCaseFormConfig;
