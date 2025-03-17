// types/form.ts
import { InputFieldProps } from "@/common/components/molecules/form/fields/input-field";
import { SelectFieldProps } from "@/common/components/molecules/form/fields/select-field";
import { TextAreaFieldProps } from "@/common/components/molecules/form/fields/text-area-field";
import { PasswordFieldProps } from "@/common/components/molecules/form/fields/password-field";
import { DateFieldProps } from "@/common/components/molecules/form/fields/date-field";

// Base type for all fields that ensures name is required
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Create field configurations with required name
export type InputConfig = WithRequired<InputFieldProps, "name"> & {
  fieldType: "input";
};

export type SelectConfig = WithRequired<SelectFieldProps, "name"> & {
  fieldType: "select";
};

export type TextAreaConfig = WithRequired<TextAreaFieldProps, "name"> & {
  fieldType: "textarea";
};

export type PasswordConfig = WithRequired<PasswordFieldProps, "name"> & {
  fieldType: "password";
};

export type DateConfig = WithRequired<DateFieldProps, "name"> & {
  fieldType: "date";
};

export type TwoColumnConfig = {
  fieldType: "two-column";
  className?: string;
  children: FormFieldConfig[];
};

// Combined type for all possible field configurations
export type FormFieldConfig =
  | InputConfig
  | SelectConfig
  | TextAreaConfig
  | TwoColumnConfig
  | DateConfig
  | PasswordConfig;

export interface FormBuilderProps {
  fields: FormFieldConfig[];
  className?: string;
}
