import { TODO_ACTIONS } from "./Actions";
import { Todo } from "../../types";

interface IInitializeTodosAction {
  type: typeof TODO_ACTIONS.INITIALIZE_TODOS;
  payload: Todo[];
}

interface IAddTodoAction {
  type: typeof TODO_ACTIONS.ADD_TODO;
  payload: string;
}

interface IDeleteTodoAction {
  type: typeof TODO_ACTIONS.DELETE_TODO;
  payload: number;
}

interface IToggleTodoAction {
  type: typeof TODO_ACTIONS.TOGGLE_TODO;
  payload: number;
}

export type TodoListActionTypes =
  | IInitializeTodosAction
  | IAddTodoAction
  | IDeleteTodoAction
  | IToggleTodoAction;
