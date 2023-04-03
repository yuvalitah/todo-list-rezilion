import { RootState } from "../../app/store";
import { Todo } from "../../types";

export const todosSelector = (state: RootState): Todo[] =>
  state.TodoListReducer.todos;
