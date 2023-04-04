import { RootState } from "../store";
import { Todo } from "../../types";

export const todosSelector = (state: RootState): Todo[] =>
  state.TodoListReducer.todos;
