import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

export interface CreateContextOptions<ContextType> {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
  /**
   * The namespace of the context
   */
  namespace?: string;
  /**
   * The default value of the context
   */
  defaultValue?: ContextType;
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  (name?: string) => T,
  React.Context<T>,
];

export function createContext<ContextType>(
  options: CreateContextOptions<ContextType> = {}
): CreateContextReturn<ContextType> {
  const { strict = true, namespace = "Context", defaultValue = null } = options;

  const Context = createReactContext<ContextType | null>(defaultValue);

  function useContext(name = "useContext") {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(`${name} must be used within a ${namespace}`);

      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>;
}
