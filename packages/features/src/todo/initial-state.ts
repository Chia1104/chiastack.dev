export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface InitialState {
  items: Todo[];
}

export const initialState: InitialState = {
  items: [],
};
