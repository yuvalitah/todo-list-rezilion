import { RootState } from "../store";

export const todoListFilterSelector = (state: RootState): string =>
  state.TodoListFilterReducer.filter;
