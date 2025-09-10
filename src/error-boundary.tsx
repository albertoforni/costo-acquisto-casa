import { Component, createSignal, JSX, onMount } from "solid-js";
import { AlertTriangle, RefreshCw, Home } from "lucide-solid";

interface ErrorBoundaryProps {
  children: JSX.Element;
  fallback?: (error: Error, retry: () => void) => JSX.Element;
}

export const ErrorBoundary: Component<ErrorBoundaryProps> = (props) => {
  const [error, setError] = createSignal<Error | null>(null);

  const retry = () => {
    setError(null);
    window.location.reload();
  };

  const defaultFallback = (error: Error, retry: () => void) => (
    <div class="flex justify-center items-center p-4 min-h-screen bg-base-200">
      <div class="w-full max-w-md">
        <div class="shadow-xl card bg-base-100">
          <div class="text-center card-body">
            <div class="flex justify-center mb-4">
              <AlertTriangle class="w-16 h-16 text-error" />
            </div>

            <h1 class="justify-center mb-2 text-2xl card-title">
              Ops! Qualcosa è andato storto
            </h1>

            <p class="mb-4 text-base-content/70">
              Si è verificato un errore inaspettato. Puoi provare a ricaricare
              la pagina o tornare alla home.
            </p>

            <div class="p-3 mb-4 text-xs text-left rounded text-base-content/50 bg-base-200">
              <details>
                <summary class="mb-2 font-medium cursor-pointer">
                  Dettagli tecnici (per sviluppatori)
                </summary>
                <code class="text-xs break-all">
                  {error.name}: {error.message}
                  {error.stack && (
                    <>
                      <br />
                      <br />
                      {error.stack}
                    </>
                  )}
                </code>
              </details>
            </div>

            <div class="gap-2 justify-center card-actions">
              <button class="gap-2 btn btn-primary" onClick={retry}>
                <RefreshCw class="w-4 h-4" />
                Ricarica Pagina
              </button>

              <button
                class="gap-2 btn btn-outline"
                onClick={() => (window.location.href = "/")}
              >
                <Home class="w-4 h-4" />
                Torna alla Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Handle unhandled promise rejections
  onMount(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setError(new Error(`Promise rejection: ${event.reason}`));
      event.preventDefault();
    };

    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      setError(event.error || new Error(event.message));
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("error", handleError);
    };
  });

  // Catch synchronous errors in the component tree
  const errorHandler = (
    e: ErrorEvent & { currentTarget: HTMLDivElement; target: Element },
  ) => {
    const error = e.error || new Error(e.message || "Unknown error");
    console.error("Component error:", error);
    setError(error);
  };

  try {
    const currentError = error();
    if (currentError) {
      return props.fallback
        ? props.fallback(currentError, retry)
        : defaultFallback(currentError, retry);
    }

    return <div onError={errorHandler}>{props.children}</div>;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return props.fallback
      ? props.fallback(error, retry)
      : defaultFallback(error, retry);
  }
};
