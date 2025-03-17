import { AxiosError } from "axios";
import {
  MutationOptions,
  QueryKey,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { ErrorResponse } from "@/feature/shared/other/interface/server.interface";
import { toast } from "@/common/components/atoms/ui/sonner";

type ExtendedError = Error & ErrorResponse;

interface UseMutateOptions<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
> extends MutationOptions<TData, ExtendedError, TVariables, TContext> {
  queryKey?: QueryKey;
  customErrorHandler?: (error: ExtendedError) => void;
  retryOnNetworkError?: boolean;
  timeout?: number;
}

/**
 * Enhanced mutation hook with improved error handling and type safety
 * @template TData The type of successful response data
 * @template TVariables The type of variables passed to the mutation function
 * @template TContext The type of context
 */
const useMutate = <TData = unknown, TVariables = unknown, TContext = unknown>(
  options: UseMutateOptions<TData, TVariables, TContext>
): UseMutationResult<TData, ExtendedError, TVariables, TContext> => {
  const {
    customErrorHandler,
    retryOnNetworkError = false,
    timeout = 30000,
    ...mutationOptions
  } = options;

  return useMutation<TData, ExtendedError, TVariables, TContext>({
    ...mutationOptions,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError) {
        // Only retry on network errors if enabled
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          return retryOnNetworkError && failureCount < 3;
        }
        // Don't retry on client or server errors
        return false;
      }
      return false;
    },
    onError: (error: unknown) => {
      if (!customErrorHandler && error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }

      if (!customErrorHandler && error instanceof Error) {
        toast.error(error.message);
      }

      if (customErrorHandler) {
        customErrorHandler(error as ExtendedError);
      }

      throw error;
    },
  });
};

export default useMutate;
