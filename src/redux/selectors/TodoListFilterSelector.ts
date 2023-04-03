import { RootState } from "../../app/store";

export const todoListFilterSelector = (state: RootState): string =>
  state.TodoListFilterReducer.filter;
