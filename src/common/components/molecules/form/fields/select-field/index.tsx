import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";

import { FC, SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";

export interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  placeholder: string;
  options: SelectOptions[];
}

interface SelectOptions {
  label: string;
  value: string;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  description,
  name,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name ?? "name"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            {options?.length > 0 && (
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
