import { Key, useCallback, useEffect, useState } from "react";

interface StorageOptions {
  prefix?: string;
  serializer?: {
    stringify: (value: any) => string;
    parse: (value: string) => any;
  };
  errorHandler?: (error: Error) => void;
  storage?: Storage;
}

type SetValue<T> = T | ((prev: T) => T);
interface UseLocalStorageReturn<T> {
  setItem: (value: SetValue<T>, overrideKey?: Key) => void;
  getItem: (overrideKey?: Key) => T | null;
  removeItem: (overrideKey?: Key) => void;
  updateItem: (updater: (prev: T) => T, overrideKey?: Key) => void;
  clear: () => void;
  hasItem: (overrideKey?: Key) => boolean;
  subscribe: (callback: (value: T | null) => void) => () => void;
  getSize: () => number;
  error: Error | null;
}

const defaultErrorHandler = (error: Error) => {
  console.error("[useLocalStorage] Error:", error);
};

const defaultSerializer = {
  stringify: JSON.stringify,
  parse: JSON.parse,
};

function useLocalStorage<T>(
  key: Key,
  initialValue?: T,
  options: StorageOptions = {}
): UseLocalStorageReturn<T> {
  const {
    prefix = "app",
    serializer = defaultSerializer,
    errorHandler = defaultErrorHandler,
    storage = typeof window !== "undefined" ? window.localStorage : null,
  } = options;

  const [error, setError] = useState<Error | null>(null);
  const [subscribers] = useState(() => new Set<(value: T | null) => void>());

  const getFullKey = useCallback(
    (overrideKey?: Key) => `${prefix}:${overrideKey ?? key}`,
    [prefix, key]
  );

  const notifySubscribers = useCallback((value: T | null) => {
    subscribers.forEach((callback) => callback(value));
  }, []);

  const safeStorage = useCallback(
    async <R>(operation: () => R, errorMessage: string): Promise<R | null> => {
      try {
        if (!storage) {
          throw new Error("Storage is not available");
        }
        const result = operation();
        setError(null);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(errorMessage);
        setError(error);
        errorHandler(error);
        return null;
      }
    },
    [storage, errorHandler]
  );

  const setItem = useCallback(
    (value: SetValue<T>, overrideKey?: Key) => {
      safeStorage(() => {
        const fullKey = getFullKey(overrideKey);
        const valueToStore =
          value instanceof Function ? value(getItem(overrideKey)!) : value;
        const serialized = serializer.stringify(valueToStore);
        storage!.setItem(fullKey, serialized);
        notifySubscribers(valueToStore);
        return valueToStore;
      }, "Failed to set item in storage");
    },
    [getFullKey, storage, serializer, notifySubscribers]
  );

  const getItem = useCallback(
    (overrideKey?: Key): T | null => {
      return safeStorage(() => {
        const fullKey = getFullKey(overrideKey);
        const item = storage!.getItem(fullKey);
        if (item === null) {
          return initialValue ?? null;
        }
        return serializer.parse(item);
      }, "Failed to get item from storage") as T | null;
    },
    [getFullKey, storage, serializer, initialValue]
  );

  const removeItem = useCallback(
    (overrideKey?: Key) => {
      safeStorage(() => {
        const fullKey = getFullKey(overrideKey);
        storage!.removeItem(fullKey);
        notifySubscribers(null);
      }, "Failed to remove item from storage");
    },
    [getFullKey, storage, notifySubscribers]
  );

  const updateItem = useCallback(
    (updater: (prev: T) => T, overrideKey?: Key) => {
      const currentValue = getItem(overrideKey);
      if (currentValue !== null) {
        setItem(updater(currentValue), overrideKey);
      }
    },
    [getItem, setItem]
  );

  const clear = useCallback(() => {
    safeStorage(() => {
      if (prefix) {
        // Only clear items with the specified prefix
        const keys = Object.keys(storage!).filter((k) =>
          k.startsWith(`${prefix}:`)
        );
        keys.forEach((k) => storage!.removeItem(k));
      } else {
        storage!.clear();
      }
      notifySubscribers(null);
    }, "Failed to clear storage");
  }, [storage, prefix, notifySubscribers]);

  const hasItem = useCallback(
    (overrideKey?: Key): boolean => {
      try {
        if (!storage) return false;
        const fullKey = getFullKey(overrideKey);
        return storage.getItem(fullKey) !== null;
      } catch (err) {
        errorHandler(
          err instanceof Error
            ? err
            : new Error("Failed to check item existence")
        );
        return false;
      }
    },
    [getFullKey, storage, errorHandler]
  );

  const subscribe = useCallback((callback: (value: T | null) => void) => {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  }, []);

  const getSize = useCallback((): number => {
    try {
      if (!storage) return 0;
      const fullKey = getFullKey();
      const item = storage.getItem(fullKey);
      if (!item) return 0;
      return new Blob([item]).size;
    } catch (err) {
      errorHandler(
        err instanceof Error ? err : new Error("Failed to get storage size")
      );
      return 0;
    }
  }, [getFullKey, storage, errorHandler]);

  // Sync with storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === storage && e.key?.startsWith(`${prefix}:`)) {
        const value = e.newValue ? serializer.parse(e.newValue) : null;
        notifySubscribers(value);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storage, prefix, serializer, notifySubscribers]);

  return {
    setItem,
    getItem,
    removeItem,
    updateItem,
    clear,
    hasItem,
    subscribe,
    getSize,
    error,
  };
}

export default useLocalStorage;

// Optional: Export types for consumers
export type { StorageOptions, UseLocalStorageReturn };
