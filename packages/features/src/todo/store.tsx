"use client";

import { createContext, use, useRef } from "react";

import { useStore } from "zustand";
import type { StateCreator, StoreApi } from "zustand/vanilla";
import { createStore } from "zustand/vanilla";

import { createDevtools } from "../utils/middleware/create-devtools";
import type { TodoActions } from "./actions";
import { createTodoActions } from "./actions";
import type { InitialState } from "./initial-state";
import { initialState } from "./initial-state";

export type TodoStore = InitialState & TodoActions;

export type TodoStoreApi = StateCreator<
  TodoStore,
  [["zustand/devtools", never]],
  [],
  TodoStore
>;

export interface TodoStoreProviderProps {
  children: React.ReactNode;
  initialState?: Partial<InitialState>;
}

const createTodoStore =
  (initialValues?: Partial<InitialState>): TodoStoreApi =>
  (...params) => ({
    ...initialState,
    ...initialValues,

    ...createTodoActions(...params),
  });

const TodoStoreContext = createContext<StoreApi<TodoStore> | null>(null);

const devtools = createDevtools("TodoStore");

const creator = (state?: Partial<InitialState>) => {
  const _state = {
    ...initialState,
    ...state,
  };

  return createStore<TodoStore, [["zustand/devtools", never]]>(
    devtools(createTodoStore(_state), {
      enabled: true,
    })
  );
};
export const TodoStoreProvider = ({
  children,
  initialState,
}: TodoStoreProviderProps) => {
  const store = useRef<StoreApi<TodoStore>>(null);

  if (!store.current) {
    store.current = creator(initialState);
  }

  return <TodoStoreContext value={store.current}>{children}</TodoStoreContext>;
};

export const useTodoStore = <T,>(
  selector: (store: TodoStore) => T,
  name = "useTodoStore"
): T => {
  const store = use(TodoStoreContext);
  if (!store) {
    throw new Error(`${name} must be used within a TodoStoreProvider.`);
  }
  return useStore(store, selector);
};
