import React, { memo } from "react";
import { FormFieldConfig, FormBuilderProps } from "./types";
import { cn } from "@/common/lib/utils";

// Lazy load form field components
const InputField = React.lazy(
  () => import("@/common/components/molecules/form/fields/input-field")
);
const SelectField = React.lazy(
  () => import("@/common/components/molecules/form/fields/select-field")
);
const TextAreaField = React.lazy(
  () => import("@/common/components/molecules/form/fields/text-area-field")
);
const PasswordField = React.lazy(
  () => import("@/common/components/molecules/form/fields/password-field")
);

const DateField = React.lazy(
  () => import("@/common/components/molecules/form/fields/date-field")
);

// Memoized field renderer component

const Field = memo(({ field }: { field: FormFieldConfig }) => {
  const { fieldType } = field;

  switch (fieldType) {
    case "input":
      return <InputField {...field} />;
    case "select":
      return <SelectField {...field} />;
    case "textarea":
      return <TextAreaField {...field} />;
    case "password":
      return <PasswordField {...field} />;
    case "date":
      return <DateField {...field} />;
    case "two-column":
      return (
        <div className={cn("grid grid-cols-2 gap-4", field.className)}>
          {field.children.map((child: FormFieldConfig, index: number) => (
            <Field key={`col-${index + 1}`} field={child} />
          ))}
        </div>
      );
    default:
      return null;
  }
});

Field.displayName = "Field";

// Main form builder component
const FormBuilder: React.FC<FormBuilderProps> = memo(
  ({ fields, className }) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className={cn("space-y-4", className)}>
          {fields.map((field, index) => (
            <Field key={`field-${index + 1}`} field={field} />
          ))}
        </div>
      </React.Suspense>
    );
  }
);

FormBuilder.displayName = "FormBuilder";

export default FormBuilder;
