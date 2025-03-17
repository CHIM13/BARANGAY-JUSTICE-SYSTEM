import { cn } from "@/common/lib/utils";
import { useTheme } from "next-themes";
import { ExternalToast, Toaster as Sonner, toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const toastStyle = {
  success: "bg-green-500 border-none",
  info: "bg-info text-info-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-destructive text-destructive-foreground border-none",
} as const;

type ToastType = keyof typeof toastStyle;

interface SonnerToastOptions extends ExternalToast {
  type?: ToastType;
}

type ToastFunction = (
  message: string,
  options?: Omit<SonnerToastOptions, "type">
) => void;

interface ToastInterface {
  (message: string, options?: SonnerToastOptions): void;
  success: ToastFunction;
  error: ToastFunction;
  info: ToastFunction;
  warning: ToastFunction;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

const createToastMethod = (type: ToastType): ToastFunction => {
  return (message, options = {}) => {
    return sonnerToast(message, {
      position: "top-right",
      duration: 3000,
      className: cn(toastStyle[type]),
      ...options,
    });
  };
};

const toast = Object.assign(
  (message: string, options: SonnerToastOptions = {}) => {
    const { type, ...rest } = options;
    const selectedType = type ? toastStyle[type] : undefined;

    return sonnerToast(message, {
      position: "top-right",
      className: cn(selectedType),

      ...rest,
    });
  },
  {
    success: createToastMethod("success"),
    error: createToastMethod("error"),
    info: createToastMethod("info"),
    warning: createToastMethod("warning"),
  }
) as ToastInterface;

export { Toaster, toast };
export type { SonnerToastOptions, ToastType };
