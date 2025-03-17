import { FC, InputHTMLAttributes, useId, useState } from "react";
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
import { Input } from "@/common/components/atoms/ui/input";
import { Check, EyeOff, X, Eye } from "lucide-react";
import { Progress } from "@/common/components/atoms/ui/progress";

interface PasswordRequirement {
  regex: RegExp;

  text: string;
}

export interface PasswordFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  // Custom requirements array
  requirements?: PasswordRequirement[];
  // Show/hide requirements list
  showRequirements?: boolean;
  // Custom strength levels and their corresponding colors
  strengthLevels?: {
    weak: number;
    medium: number;
    strong: number;
  };
  strengthColors?: {
    empty: string;
    weak: string;
    medium: string;
    strong: string;
  };
  // Custom strength level messages
  strengthMessages?: {
    empty: string;
    weak: string;
    medium: string;
    strong: string;
  };
}

const defaultRequirements: PasswordRequirement[] = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /\d/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
];

const defaultStrengthLevels = {
  weak: 2,
  medium: 3,
  strong: 4,
};

const defaultStrengthColors = {
  empty: "bg-border",
  weak: "bg-red-500",
  medium: "bg-amber-500",
  strong: "bg-emerald-500",
};

const defaultStrengthTextsColors = {
  empty: "text-muted-foreground",
  weak: "text-red-500",
  medium: "text-amber-500",
  strong: "text-emerald-500",
};

const defaultStrengthMessages = {
  empty: "Enter a password",
  weak: "Weak password",
  medium: "Medium password",
  strong: "Strong password",
};

const PasswordField: FC<PasswordFieldProps> = ({
  label,
  description,
  requirements = defaultRequirements,
  showRequirements = true,
  strengthLevels = defaultStrengthLevels,
  strengthColors = defaultStrengthColors,
  strengthMessages = defaultStrengthMessages,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const id = useId();
  const form = useFormContext();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const checkStrength = (pass: string) => {
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  return (
    <FormField
      control={form.control}
      name={props?.name ?? "password"}
      render={({ field }) => {
        const strength = checkStrength(field.value || "");
        const strengthScore = strength.filter((req) => req.met).length;

        const getStrengthColor = (score: number) => {
          if (score === 0) return strengthColors.empty;
          if (score <= strengthLevels.weak) return strengthColors.weak;
          if (score <= strengthLevels.medium) return strengthColors.medium;
          return strengthColors.strong;
        };

        const getStrengthText = (score: number) => {
          if (score === 0) return strengthMessages.empty;
          if (score <= strengthLevels.weak) return strengthMessages.weak;
          if (score <= strengthLevels.medium) return strengthMessages.medium;
          return strengthMessages.strong;
        };

        const getStrengthTextColor = (score: number) => {
          if (score === 0) return defaultStrengthTextsColors.empty;
          if (score <= strengthLevels.weak)
            return defaultStrengthTextsColors.weak;
          if (score <= strengthLevels.medium)
            return defaultStrengthTextsColors.medium;
          return defaultStrengthTextsColors.strong;
        };

        // Calculate progress percentage
        const progressValue = (strengthScore / requirements.length) * 100;

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...field}
                      {...props}
                      id={id}
                      className="pe-9"
                      type={isVisible ? "text" : "password"}
                      aria-invalid={strengthScore < requirements.length}
                      aria-describedby={`${id}-description`}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password strength indicator */}
                {showRequirements && (
                  <div className="my-2">
                    <Progress
                      color={getStrengthColor(strengthScore)}
                      value={progressValue}
                      className={cn("h-1 w-full")}
                    />
                  </div>
                )}

                {/* Password strength description */}

                {showRequirements && (
                  <p
                    id={`${id}-description`}
                    className={cn(
                      `mb-2 text-sm font-medium text-muted-foreground mt-2`,
                      getStrengthTextColor(strengthScore),
                      showRequirements && "text-foreground"
                    )}
                  >
                    {getStrengthText(strengthScore)}

                    {showRequirements && ". Must contain:"}
                  </p>
                )}

                {/* Password requirements list */}
                {showRequirements && (
                  <ul
                    className="space-y-1.5"
                    aria-label="Password requirements"
                  >
                    {strength.map((req) => (
                      <li key={req.text} className="flex items-center gap-2">
                        {req.met ? (
                          <Check
                            size={16}
                            className="text-emerald-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={cn("text-xs", {
                            "text-emerald-600": req.met,
                            "text-muted-foreground": !req.met,
                          })}
                        >
                          {req.text}
                          <span className="sr-only">
                            {req.met
                              ? " - Requirement met"
                              : " - Requirement not met"}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default PasswordField;
