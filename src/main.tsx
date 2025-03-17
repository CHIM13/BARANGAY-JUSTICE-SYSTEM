import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./common/components/template/providers/theme-provider/index.tsx";
import LoadingScreen from "./common/components/atoms/helper/loading-screen/index.tsx";
import ErrorScreen from "./common/components/atoms/helper/error-screen/index.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <Toaster />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorScreen onReset={resetErrorBoundary} />
              )}
            >
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
