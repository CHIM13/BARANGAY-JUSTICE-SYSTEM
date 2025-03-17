import { FC, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
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
import { Button } from "@/common/components/atoms/ui/button";
import { Input } from "@/common/components/atoms/ui/input";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;

  dir?: "left" | "right";
  icon?: ReactNode;
  onPress?: () => void;
}

const InputField: FC<InputFieldProps> = ({ label, description, ...props }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const form = useFormContext();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <FormField
      control={form.control}
      name={props?.name ?? "name"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              ref={divRef}
              tabIndex={-1}
              className={cn(
                "rounded-base flex items-center rounded-md border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                props.className
              )}
            >
              {props.dir === "left" && props.icon && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-[48px]"
                  onClick={props.onPress}
                >
                  {props.icon}
                </Button>
              )}

              <Input {...props} {...field} className={cn("border-none ")} />
              {props.dir === "right" && props.icon && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-[48px]"
                  onClick={props.onPress}
                >
                  {props.icon}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
