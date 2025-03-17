import api from "@/api/client";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ExtendedError extends Error {
  name: string;
  message: string;
  status?: number;
  statusText?: string;
  code?: string;
  stack?: string;
  response?: {
    data?: any;
    headers?: any;
    status?: number;
    statusText?: string;
  };
  config?: {
    url?: string;
    method?: string;
    headers?: any;
  };
}

interface UseFetchOptions<T>
  extends Omit<UseQueryOptions<T, ExtendedError, T>, "queryKey" | "queryFn"> {
  onSuccess?: (data: T) => void;
  onError?: (error: ExtendedError) => void;
}

function createExtendedError(error: unknown): ExtendedError {
  if (error instanceof AxiosError) {
    const extendedError: ExtendedError = new Error(error.message);
    extendedError.name = error.name;
    extendedError.message = error.message;
    extendedError.status = error.response?.status;
    extendedError.statusText = error.response?.statusText;
    extendedError.code = error.code;
    extendedError.stack = error.stack;
    extendedError.response = {
      data: error.response?.data,
      headers: error.response?.headers,
      status: error.response?.status,
      statusText: error.response?.statusText,
    };
    extendedError.config = {
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
    };
    return extendedError;
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } as ExtendedError;
  }

  return {
    name: "UnknownError",
    message: "An unknown error occurred",
  } as ExtendedError;
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions<T>
): UseQueryResult<T, ExtendedError> {
  const { onSuccess, onError, ...queryOptions } = options || {};

  return useQuery<T, ExtendedError>({
    queryKey: [url],
    queryFn: async () => {
      try {
        const response = await api.get<T>(url);
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data;
      } catch (error) {
        const extendedError = createExtendedError(error);
        if (onError) {
          onError(extendedError);
        }
        throw extendedError;
      }
    },
    ...queryOptions,
  });
}

export type { ExtendedError, UseFetchOptions };
export default useFetch;
