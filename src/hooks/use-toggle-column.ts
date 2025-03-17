import { useState, useCallback } from "react";

interface UseToggleColumnProps {
  defaultValue?: boolean;
  onToggleOn?: () => void | Promise<void>;
  onToggleOff?: () => void | Promise<void>;
  onChange?: (value: boolean) => void | Promise<void>;
}

interface UseToggleColumnReturn {
  value: boolean;
  setValue: (value: boolean) => Promise<void>;
  toggle: () => void;
  isLoading: boolean;
}

export const useToggleColumn = ({
  defaultValue = false,
  onToggleOn,
  onToggleOff,
  onChange,
}: UseToggleColumnProps = {}): UseToggleColumnReturn => {
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const setValue = useCallback(
    async (newValue: boolean) => {
      try {
        setIsLoading(true);
        if (newValue) {
          await onToggleOn?.();
        } else {
          await onToggleOff?.();
        }
        await onChange?.(newValue);
        setIsEnabled(newValue);
      } catch (error) {
        console.error("Toggle action failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onToggleOn, onToggleOff, onChange]
  );

  const toggle = useCallback(() => {
    setValue(!isEnabled);
  }, [isEnabled, setValue]);

  return {
    value: isEnabled,
    setValue,
    toggle,
    isLoading,
  };
};
