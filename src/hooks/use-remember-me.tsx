import { useState, useEffect, useCallback } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import useLocalStorage from "@/common/hooks/utils/useLocalStorage";

interface RememberMeState<T> {
  isEnabled: boolean;
  data: T | null;
}

interface UseRememberMeOptions<T> {
  storageKey?: string;
  initialChecked?: boolean;
  initialData?: T | null;
  onDataLoad?: (data: T | null) => void;
  onDataSave?: (data: T | null) => void;
  validateData?: (data: T) => boolean;
}

function useRememberMe<T extends Record<string, any>>(
  options: UseRememberMeOptions<T> = {}
) {
  const {
    storageKey = "remember-me",
    initialChecked = false,
    initialData = null,
    onDataLoad,
    onDataSave,
    validateData,
  } = options;

  const storage = useLocalStorage<RememberMeState<T>>(storageKey, {
    isEnabled: initialChecked,
    data: initialData,
  });

  const [rememberMe, setRememberMe] = useState<CheckedState>(initialChecked);
  const [data, setData] = useState<T | null>(initialData);

  // Load initial state from storage
  useEffect(() => {
    (async () => {
      const storedState = await storage.getItem();
      if (storedState) {
        setRememberMe(storedState.isEnabled);

        if (storedState.data) {
          setData(storedState.data);
          onDataLoad?.(storedState.data);
        }
      }
    })();
  }, []);

  // Toggle remember me state
  const toggleRememberMe = useCallback(
    (checked: CheckedState) => {
      setRememberMe(checked);

      if (!checked) {
        storage.setItem({ isEnabled: false, data: null });
        setData(initialData);
      } else if (data) {
        storage.setItem({ isEnabled: true, data });
      }
    },
    [data, initialData, storage]
  );

  // Update stored data
  const updateData = useCallback(
    (newData: T | ((prev: T | null) => T)) => {
      try {
        const updatedData =
          newData instanceof Function ? newData(data) : newData;

        if (validateData && !validateData(updatedData)) {
          throw new Error("Data validation failed");
        }

        setData(updatedData);

        if (rememberMe) {
          storage.setItem({
            isEnabled: true,
            data: updatedData,
          });
          onDataSave?.(updatedData);
        }
      } catch (err) {
        console.error("Failed to update data:", err);
      }
    },
    [rememberMe, data, storage, validateData, onDataSave]
  );

  // Clear stored data
  const clear = useCallback(() => {
    storage.removeItem();
    setRememberMe(false);
    setData(initialData);
  }, [initialData, storage]);

  return {
    rememberMe,
    toggleRememberMe,
    data,
    setData: updateData,
    clear,
  };
}

// Specialized hook for login credentials
interface LoginCredentials {
  email: string;
}

const useLoginRememberMe = (
  options: Omit<UseRememberMeOptions<LoginCredentials>, "validateData"> = {}
) => {
  return useRememberMe<LoginCredentials>({
    ...options,
    validateData: (data) => {
      return typeof data.email === "string" && data.email.includes("@");
    },
  });
};

export { useLoginRememberMe };
export type { UseRememberMeOptions, RememberMeState };
