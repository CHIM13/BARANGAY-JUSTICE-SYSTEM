import { FC, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { cn } from "@/common/lib/utils";
import { Textarea } from "@/common/components/atoms/ui/textarea";

export interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  description,
  ...props
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={props?.name ?? "name"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea {...props} {...field} className={cn(props.className)} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaField;
