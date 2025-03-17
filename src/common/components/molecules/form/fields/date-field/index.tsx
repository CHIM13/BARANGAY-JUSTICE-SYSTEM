"use client";
import { FC, InputHTMLAttributes, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { Calendar } from "@/common/components/atoms/ui/calendar-rac";
import { DateInput } from "@/common/components/atoms/ui/datefield-rac";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Popover,
} from "react-aria-components";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";

export interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const DateField: FC<DateFieldProps> = ({ label, description, ...props }) => {
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
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              className="space-y-2"
            >
              <div className="flex">
                <Group className="w-full">
                  <DateInput className="pe-9" />
                </Group>
                <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
                  <CalendarIcon size={16} strokeWidth={2} />
                </Button>
              </div>
              <Popover
                className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
                offset={4}
              >
                <Dialog className="max-h-[inherit] overflow-auto p-2">
                  <Calendar />
                </Dialog>
              </Popover>
            </DatePicker>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
