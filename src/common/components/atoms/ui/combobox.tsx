"use client";

import { Button } from "@/common/components/atoms/ui/button";
import { cn } from "@/common/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/atoms/ui/command";
import { Label } from "@/common/components/atoms/ui/label";
import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue.js",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "ember",
    label: "Ember.js",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "eleventy",
    label: "Eleventy",
  },
  {
    value: "solid",
    label: "SolidJS",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "qwik",
    label: "Qwik",
  },
  {
    value: "alpine",
    label: "Alpine.js",
  },
  {
    value: "lit",
    label: "Lit",
  },
];

function ComboboxInput() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Select with search</Label>
      <div className="relative">
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          onClick={() => setOpen(!open)}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework"}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={cn(
              "shrink-0 text-muted-foreground/80 transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </Button>

        {open && (
          <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover shadow-md outline-none border-input">
            <Command className="w-full">
              <CommandInput
                placeholder="Search framework..."
                className="border-none focus:ring-0"
                autoFocus
              />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      {value === framework.value && (
                        <Check size={16} strokeWidth={2} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComboboxInput;
