interface ErrorWithProperties {
  message?: string;
  statusCode?: number;
  status?: number;
  stack?: string;
}

export function handleExecutionError(error: unknown) {
  // Normalize error into JSON-friendly object that the node returns as an item
  const errorObj = error as ErrorWithProperties;
  const message = errorObj?.message || 'Unknown error';
  const status = errorObj?.statusCode || errorObj?.status || 500;
  const stack = errorObj?.stack;

  return {
    error: {
      message,
      status,
      stack,
    },
  };
}
