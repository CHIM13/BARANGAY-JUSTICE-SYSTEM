import { FormFieldConfig } from "@/utils/form/form-builder/types";

const createScheduleCaseFormConfig: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "natureOfDispute",
    label: "Nature of Dispute",
    placeholder: "Enter the nature of dispute",
  },
  {
    fieldType: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Enter the description",
  },

  {
    fieldType: "date",
    name: "incidentDate",
    label: "Incident Date",
    placeholder: "Select the incident date",
  },
  {
    fieldType: "input",
    name: "incidentTime",
    label: "Incident Time",
    placeholder: "Enter the incident time",
  },

  {
    fieldType: "input",
    name: "location",
    label: "Incident Location",
    placeholder: "Enter the incident location",
  },
];

export default createScheduleCaseFormConfig;
