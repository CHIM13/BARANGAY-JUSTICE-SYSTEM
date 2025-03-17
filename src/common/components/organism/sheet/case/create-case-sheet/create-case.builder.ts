import { FormFieldConfig } from "@/utils/form/form-builder/types";

export const caseInfoStep: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "title",
    label: "Title",
    placeholder: "Enter Title",
  },
  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "caseNumber",
        label: "Case Number",
        placeholder: "Enter Case Number",
      },
      {
        fieldType: "select",
        name: "type",
        label: "Type",
        placeholder: "Select Type",
        options: [
          { label: "Civil", value: "civil" },
          { label: "Criminal", value: "criminal" },
        ],
      },
    ],
  },

  {
    fieldType: "date",
    name: "date",
    label: "Date",
    placeholder: "Select Date",
  },

  {
    fieldType: "select",
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "In Progress", value: "in-progress" },
      { label: "Completed", value: "completed" },
    ],
  },
  {
    fieldType: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
  },
];

export const compliantInfoStep: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter First Name",
  },
  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "middleName",
        label: "Middle Name",
        placeholder: "Enter Middle Name",
      },
      {
        fieldType: "input",
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter Last Name",
      },
    ],
  },

  {
    fieldType: "input",
    name: "address",
    label: "Full Address",
    placeholder: "Enter Full Address",
  },

  {
    fieldType: "input",
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
  },

  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "email",
        label: "Email",
        placeholder: "Enter Email",
      },
      {
        fieldType: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        showRequirements: false,
      },
    ],
  },
];

export const defendantInfoStep: FormFieldConfig[] = [
  {
    fieldType: "input",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter First Name",
  },
  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "middleName",
        label: "Middle Name",
        placeholder: "Enter Middle Name",
      },
      {
        fieldType: "input",
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter Last Name",
      },
    ],
  },

  {
    fieldType: "input",
    name: "address",
    label: "Full Address",
    placeholder: "Enter Full Address",
  },

  {
    fieldType: "input",
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
  },

  {
    fieldType: "two-column",
    children: [
      {
        fieldType: "input",
        name: "email",
        label: "Email",
        placeholder: "Enter Email",
      },
      {
        fieldType: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        showRequirements: false,
      },
    ],
  },
];

// export const otherInfoStep: FormFieldConfig[] = [];
